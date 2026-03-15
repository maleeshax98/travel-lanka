"use client"
import React, { useRef, useState } from "react";

export default function CoordinatePicker() {
  const imgRef = useRef(null);
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState([]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  }

  function handleClick(e) {
    const rect = imgRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const point = {
      id: Date.now(),
      px: Math.round(x),
      py: Math.round(y),
      left: percentX.toFixed(2) + "%",
      top: percentY.toFixed(2) + "%"
    };

    setPoints((prev) => [...prev, point]);
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Interactive Map Coordinate Picker</h2>

      <input type="file" onChange={handleUpload} />

      {image && (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: 20
          }}
        >
          <img
            ref={imgRef}
            src={image}
            onClick={handleClick}
            style={{ maxWidth: "900px", cursor: "crosshair" }}
          />

          {points.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.left,
                top: p.top,
                transform: "translate(-50%, -50%)",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "red"
              }}
            />
          ))}
        </div>
      )}

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(points, null, 2)}
      </pre>
    </div>
  );
}
