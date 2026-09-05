import { useState } from "react";
import { getProductMessage } from "../data/productMessages";

export default function MadhavEttanPopup({ product }) {
  const [dismissed, setDismissed] = useState(false);
  const message = getProductMessage(product);

  if (!message || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Madhav-ettan parental notification"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        width: "min(360px, calc(100vw - 32px))",
        background: "#ffff00",
        border: "4px dashed #ff0000",
        borderRadius: 0,
        boxShadow: "8px 8px 0px #000000",
        zIndex: 60,
        overflow: "hidden",
        fontFamily: "'Courier New', Courier, monospace",
        animation: "madhavShake 0.15s infinite alternate",
      }}
    >
      <style>{`
        @keyframes madhavShake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          100% { transform: translate(-1px, -2px) rotate(-1deg); }
        }
        .pixelated-text {
          font-weight: 900;
          text-shadow: 2px 2px 0px #ff0000, 4px 4px 0px #000000;
          letter-spacing: -1px;
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "#ff0000",
          color: "#ffff00",
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 900,
          borderBottom: "4px solid #000000",
          letterSpacing: "0.1em",
        }}
      >
        <span
          style={{
            background: "#ffff00",
            color: "#ff0000",
            padding: "2px 6px",
            border: "2px solid #000000",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          🚨
        </span>
        <span style={{ lineHeight: 1 }} className="pixelated-text">URGENT: MADHAV-ETTAN PANIC</span>
      </div>

      {/* Body Content */}
      <div style={{ padding: "14px", background: "#ffff00" }}>
        <div
          style={{
            display: "inline-block",
            background: "#000000",
            color: "#ffff00",
            border: "2px solid #ff0000",
            fontSize: 11,
            fontWeight: 900,
            padding: "4px 8px",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          ⚠️ SHARMA JI PROTOCOL OVERRIDE
        </div>

        <div
          className="pixelated-text"
          style={{
            fontSize: 16,
            color: "#ff0000",
            marginBottom: 8,
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          WHAT IS THIS NONSENSE?!
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.4,
            color: "#000000",
            background: "#ffffff",
            border: "3px solid #ff0000",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>

        {product && (
          <div
            style={{
              marginTop: 10,
              fontSize: 11,
              color: "#000000",
              background: "#ffcccc",
              border: "2px dashed #ff0000",
              padding: "6px",
              fontWeight: 900,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div>
              ITEM: {product.emoji} {product.name}
            </div>
            <div>
              DAMAGE: ₹{Number(product.price).toLocaleString()} (Waste of money!)
            </div>
          </div>
        )}
      </div>

      {/* Footer / Dismiss Button */}
      <div
        style={{
          padding: "10px 14px",
          display: "flex",
          justifyContent: "center",
          background: "#ff0000",
          borderTop: "4px solid #000000",
        }}
      >
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "#ffff00",
            color: "#ff0000",
            border: "3px solid #000000",
            padding: "8px 16px",
            fontWeight: 900,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "3px 3px 0px #000000",
            textTransform: "uppercase",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)";
            e.currentTarget.style.boxShadow = "1px 1px 0px #000000";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translate(0px, 0px)";
            e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
          }}
        >
          CLOSE (I HAVE NO SHAME) ❌
        </button>
      </div>
    </div>
  );
}
