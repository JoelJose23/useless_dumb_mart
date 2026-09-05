import { useState, useEffect } from "react";
import { X, Tag } from "lucide-react";

export default function Ads() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAd, setActiveAd] = useState(0);

  const ads = [
    {
      id: "grid-de",
      lang: "Deutsch",
      title: "Netzfehler-Warnung",
      body: "Wegen Ihres sinnlosen Einkaufs ist der lokale Transformator explodiert. Stromausfall für 72 Stunden. Bitte zünden Sie Kerzen an und überdenken Sie Ihr Leben.",
      icon: "⚡"
    },
    {
      id: "grid-he",
      lang: "עברית",
      title: "אזהרת תקלת רשת חשמל",
      body: "עקב הרכישה חסרת התועלת שלך, השנאי המקומי התפוצץ. הפסקת חשמל למשך 72 שעות. נא להדליק נרות ולחשוב על בחירות החיים שלך.",
      icon: "🔌"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      setActiveAd((prev) => (prev + 1) % ads.length);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  const current = ads[activeAd];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#111",
        border: "2px solid #ff4444",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "360px",
        width: "100%",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(255, 68, 68, 0.4)",
        zIndex: 99999,
        textAlign: "left",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "transparent",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
        }}
        onClick={() => setIsVisible(false)}
      >
        <X size={18} />
      </button>

      {/* Prominent "AD" Tag Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ background: "#ff4444", color: "#fff", fontSize: "10px", fontWeight: "900", padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.1em" }}>
            AD
          </span>
          <span style={{ fontSize: "10px", color: "#888", fontWeight: "700", letterSpacing: "0.1em" }}>
            SPONSORED ANNOYANCE
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <span style={{ fontSize: "24px" }}>{current.icon}</span>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "800",
            color: "#ff4444",
            letterSpacing: "0.15em",
          }}
        >
          INFRASTRUCTURE FAILURE [{current.lang.toUpperCase()}]
        </div>
      </div>

      <h3 style={{ fontSize: "16px", margin: "0 0 8px", color: "#fff" }}>
        {current.title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          color: "#ccc",
          lineHeight: "1.5",
          marginBottom: "16px",
          direction: current.lang === "עברית" ? "rtl" : "ltr"
        }}
      >
        {current.body}
      </p>

      <button
        className="add-cart-button"
        style={{
          width: "100%",
          background: "#ff4444",
          border: "none",
          color: "#fff",
          padding: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "6px",
          fontSize: "13px",
        }}
        onClick={() => setIsVisible(false)}
      >
        I Accept My Darkness 🕯️
      </button>
    </div>
  );
}
