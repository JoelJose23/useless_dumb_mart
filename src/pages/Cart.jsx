import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import shockedSound from "../assets/shocked-sound-effect.mp3";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const [btnOffset, setBtnOffset] = useState({
    x: 0,
    y: 0,
  });

  const [dodgeCount, setDodgeCount] = useState(0);
  const [tauntText, setTauntText] = useState(
    "Proceed to checkout →"
  );

  // Emotional Well-being Score (deducts ₹500 on chappal hit)
  const [wellBeingScore, setWellBeingScore] = useState(10000);
  const [chappalPoints, setChappalPoints] = useState(0);
  const [chappalHitMsg, setChappalHitMsg] = useState(false);

  // Floating Chappal Game state for the entire page bottom
  const [chappalPos, setChappalPos] = useState({ x: 100, y: 100 });
  const [chappalVel, setChappalVel] = useState({ x: 5, y: 4 });

  const taunts = [
    "You can't catch me!",
    "Too slow! 🏃‍♂️",
    "Commitment issues? 🤡",
    "Why run from your regret?",
    "NOPE 💨",
    "GET AWAY FROM ME 😭",
    "I'M NOT READY FOR FINANCIAL RESPONSIBILITY",
    "NICE TRY 🏃‍♂️",
    "THE BUTTON HAS CHOSEN FREEDOM",
    "CHECKOUT? NEVER HEARD OF IT.",
  ];

  // Animation loop for the floating chappal bouncing across the whole window/screen
  useEffect(() => {
    const interval = setInterval(() => {
      setChappalPos((prev) => {
        let nextX = prev.x + chappalVel.x;
        let nextY = prev.y + chappalVel.y;
        let velX = chappalVel.x;
        let velY = chappalVel.y;

        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - 80;

        if (nextX <= 0 || nextX >= maxX) velX *= -1;
        if (nextY <= 0 || nextY >= maxY) velY *= -1;

        if (velX !== chappalVel.x || velY !== chappalVel.y) {
          setChappalVel({ x: velX, y: velY });
        }

        return { x: prev.x + velX, y: prev.y + velY };
      });
    }, 25);

    return () => clearInterval(interval);
  }, [chappalVel]);

  // Global mouse tracking to check if cursor crashes into the floating chappal
  const handleGlobalMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.hypot(mouseX - chappalPos.x, mouseY - chappalPos.y);

    if (distance < 45) {
      setChappalPoints((pts) => pts + 1);
      setWellBeingScore((score) => Math.max(0, score - 500));
      setChappalHitMsg(true);
      setTimeout(() => setChappalHitMsg(false), 800);

      // Play shocked sound effect on impact
      try {
        const audio = new Audio(shockedSound);
        audio.play().catch(() => {});
      } catch (err) {
        console.log(err);
      }

      setChappalPos({
        x: Math.random() * (window.innerWidth - 200) + 50,
        y: Math.random() * (window.innerHeight - 200) + 50,
      });
    }
  };

  const handleCheckoutMouseMove = (e) => {
    if (dodgeCount >= 5) {
      return;
    }

    const btn = e.currentTarget.getBoundingClientRect();
    const btnCenterX = btn.left + btn.width / 2;
    const btnCenterY = btn.top + btn.height / 2;

    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 120) {
      const angle = Math.atan2(distY, distX);
      const jumpDistance = 180;

      const newX = btnOffset.x - Math.cos(angle) * jumpDistance;
      const newY = btnOffset.y - Math.sin(angle) * jumpDistance;

      setBtnOffset({ x: newX, y: newY });

      const newDodgeCount = dodgeCount + 1;
      setDodgeCount(newDodgeCount);

      if (newDodgeCount >= 5) {
        setTauntText("Fine. You win. Proceed to checkout →");
      } else {
        setTauntText(taunts[Math.floor(Math.random() * taunts.length)]);
      }
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="product-details-page">
        <div className="product-warning">
          <AlertTriangle size={15} />
          <span>YOUR CART IS AS EMPTY AS OUR PROMISES.</span>
        </div>

        <main className="product-container">
          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to shopping
          </button>

          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 50, marginBottom: 16 }}>🛒</div>
            <h2>Your cart is empty</h2>
            <p style={{ color: "#777", marginTop: 8 }}>
              You haven't added anything useless yet.
            </p>
            <button
              className="add-cart-button"
              style={{ marginTop: 24, padding: "12px 24px" }}
              onClick={() => navigate("/")}
            >
              Browse useless products
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      style={{ position: "relative", minHeight: "100vh" }}
      className="product-details-page"
    >
      {/* =====================================================
          WHATSAPP FAMILY GROUP TOXIC BANNER
          ===================================================== */}
      <div
        style={{
          background: "#075e54",
          color: "#fff",
          padding: "8px 12px",
          fontSize: "12px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderBottom: "2px solid #128c7e",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            background: "#25d366",
            color: "#000",
            fontWeight: 900,
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
          }}
        >
          WHATSAPP
        </span>
        <marquee scrollamount="6" style={{ fontWeight: 600 }}>
          💬 [WhatsApp Notification] Chithappan forwarded to &quot;Global Nair Family 🌺&quot;: &quot;Look at what useless garbage our relative&apos;s child is buying online instead of studying for PSC exams. Forwarding to Tharavadu elders immediately.&quot;
        </marquee>
      </div>

      <div className="product-warning">
        <AlertTriangle size={15} />
        <span>CONGRATULATIONS — YOUR CART NOW CONTAINS REGRET.</span>
      </div>

      <main className="product-container">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Continue shopping
        </button>

        <div className="breadcrumb">
          Home / <strong>Cart ({cart.length})</strong>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <ShoppingBag size={28} />
          <h1 style={{ margin: 0, fontSize: 32 }}>Your Useless Cart</h1>
          <span style={{ color: "#777", fontSize: 14 }}>
            {cart.length} item(s)
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.9fr",
            gap: 32,
            alignItems: "start",
          }}
          className="cart-layout"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {cart.map((item, index) => (
              <div
                key={item.id ? `${item.id}-${index}` : index}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 16,
                  background: "#fff",
                  border: "1px solid #ddd",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    background: "#ecece8",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 32,
                    flexShrink: 0,
                  }}
                >
                  {item.emoji || "📦"}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#777",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.category ? item.category.toUpperCase() : "USELESS GOODS"}
                  </div>

                  <strong>{item.name || "Unnamed Nothing"}</strong>

                  <div style={{ color: "#777", fontSize: 13 }}>
                    {item.description}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>₹{Number(item.price || 0).toLocaleString()}</span>

                    {/* Naattukar enthu parayum in Malayalam next to product price */}
                    <span
                      style={{
                        color: "#dc2626",
                        fontWeight: 900,
                        fontSize: 12,
                      }}
                    >
                      നാട്ടുകാർ എന്ത് പറയും? 🤦‍♂️
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    border: "1px solid #ddd",
                    background: "#fff",
                    padding: "8px 10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  title="Remove"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                background: "transparent",
                border: "1px solid #ccc",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Clear cart
            </button>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              padding: 20,
              position: "sticky",
              top: 90,
            }}
          >
            <h3 style={{ margin: "0 0 16px" }}>Order summary</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: "#555",
              }}
            >
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: "#555",
              }}
            >
              <span>Delivery</span>
              <span style={{ color: "#999" }}>Eventually</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
                fontWeight: 800,
                fontSize: 18,
                borderTop: "1px solid #eee",
                paddingTop: 12,
              }}
            >
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* CHECKOUT BUTTON RESTORED */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "48px",
              }}
            >
              <button
                className="add-cart-button"
                onMouseMove={handleCheckoutMouseMove}
                onClick={() => navigate("/checkout")}
                style={{
                  padding: "12px 18px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  position: dodgeCount > 0 ? "fixed" : "relative",
                  left: dodgeCount > 0 ? "50%" : "auto",
                  top: dodgeCount > 0 ? "50%" : "auto",
                  transform:
                    dodgeCount > 0
                      ? `translate(calc(-50% + ${btnOffset.x}px), calc(-50% + ${btnOffset.y}px))`
                      : "none",
                  transition: "transform 0.15s ease-out",
                  zIndex: dodgeCount > 0 ? 9999 : "auto",
                }}
              >
                {tauntText}
                {dodgeCount < 5 && " 🏃‍♂️💨"}
              </button>
            </div>

            <p
              style={{
                fontSize: 11,
                color: "#999",
                marginTop: 10,
                lineHeight: 1.5,
              }}
            >
              By checking out you agree that satisfaction is not guaranteed,
              not expected, and not our problem.
            </p>
          </div>
        </div>

        {/* =====================================================
            FLOATING CHAPPAL DEFENSE MINI-GAME WIDGET (BOTTOM)
            ===================================================== */}
        <div
          style={{
            marginTop: "50px",
            background: "#111",
            border: "2px dashed #ff4444",
            borderRadius: "12px",
            padding: "20px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", color: "#ff4444", letterSpacing: "0.1em", marginBottom: "4px" }}>
              🩴 CHAPPAL DEFENSE ARENA (BOTTOM ZONE)
            </div>
            <p style={{ fontSize: "13px", color: "#ccc", margin: 0 }}>
              Touch the flying chappal wandering around the page to earn Chappal Points (at the cost of your emotional well-being)!
            </p>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ background: "#222", padding: "10px 16px", borderRadius: "8px", border: "1px solid #444", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "#888", fontWeight: "bold" }}>CHAPPAL POINTS</div>
              <div style={{ fontSize: "18px", fontWeight: "900", color: "#facc15" }}>{chappalPoints} 🩴</div>
            </div>

            <div style={{ background: "#222", padding: "10px 16px", borderRadius: "8px", border: "1px solid #444", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "#888", fontWeight: "bold" }}>EMOTIONAL WELL-BEING</div>
              <div style={{ fontSize: "18px", fontWeight: "900", color: wellBeingScore < 5000 ? "#ef4444" : "#22c55e" }}>
                ₹{wellBeingScore.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Crash/Hit Popup Notification */}
      {chappalHitMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#dc2626",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: "999px",
            fontWeight: 900,
            fontSize: "14px",
            zIndex: 99999,
            boxShadow: "0 10px 25px rgba(220, 38, 38, 0.5)",
            pointerEvents: "none",
          }}
        >
          💥 DIRECT HIT! +1 Chappal Point | -₹500 Emotional Damage!
        </div>
      )}

      {/* Floating Bouncing Chappal across the entire screen */}
      <div
        style={{
          position: "fixed",
          left: `${chappalPos.x}px`,
          top: `${chappalPos.y}px`,
          fontSize: "36px",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "rotate(45deg)",
          filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))",
        }}
      >
        🩴
      </div>
    </div>
  );
}
