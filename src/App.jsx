import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const videoRef = useRef(null);
  const [mirrored, setMirrored] = useState(false); // false = true view (how others see you)
  const [facing, setFacing] = useState("user");    // "user" = front, "environment" = back
  const [error, setError] = useState("");

  useEffect(() => {
    let stream;
    setError("");

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: facing }, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setError("Camera access denied or not available."));

    return () => stream?.getTracks().forEach((t) => t.stop());
  }, [facing]);

  return (
    <div className="app">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
      />

      {error && <p className="error">{error}</p>}

      <div className="controls">
        <button onClick={() => setMirrored((m) => !m)}>
          {mirrored ? "Show True View" : "Show Mirror View"}
        </button>
        <button onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}>
          Switch Camera
        </button>
      </div>
    </div>
  );
}