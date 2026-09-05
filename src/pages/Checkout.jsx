import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  return (
    <div className="product-details-page">
      <div className="product-warning">
        <AlertTriangle size={15} />
        <span>CHECKOUT IS A SOCIAL CONSTRUCT. BUT OKAY.</span>
      </div>

      <main className="product-container">
        <button
          className="back-button"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft size={18} />
          Back to cart
        </button>

        <div className="breadcrumb">
          Home / Cart / <strong>Checkout</strong>
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
          <h1 style={{ margin: 0, fontSize: 32 }}>
            Checkout
          </h1>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              border: "1px solid #ddd",
            }}
          >
            <p style={{ color: "#777" }}>
              Your cart is empty. Nothing to checkout.
            </p>

            <button
              className="add-cart-button"
              style={{ marginTop: 16 }}
              onClick={() => navigate("/")}
            >
              Go shopping
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                padding: 20,
                marginBottom: 24,
              }}
            >
              <h3>
                Order summary — {cart.length} useless item(s)
              </h3>

              <p style={{ color: "#555" }}>
                Total: ₹{total.toLocaleString()}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: "#999",
                }}
              >
                This is where you would normally pay. But this is
                UselessMart™, so...
              </p>
            </div>

            {/* =====================================================
                IVY LEAGUE STYLE DIPLOMA CERTIFICATE
                ===================================================== */}
            <div
              style={{
                backgroundColor: "#fffdf9",
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                border: "12px solid #1e3a8a",
                outline: "4px solid #d97706",
                outlineOffset: "-8px",
                padding: "40px 30px",
                textAlign: "center",
                marginBottom: "30px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                position: "relative",
                fontFamily: "'Times New Roman', Times, serif",
                color: "#1f2937",
              }}
            >
              {/* Corner Crest Stamps */}
              <div style={{ position: "absolute", top: "16px", left: "16px", fontSize: "28px" }}>🏛️</div>
              <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "28px" }}>📜</div>

              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.3em", color: "#1e3a8a", textTransform: "uppercase", marginBottom: "8px" }}>
                  The University of Major Life Disappointments (UMLD)
                </div>

              <div style={{ fontSize: "13px", fontStyle: "italic", color: "#4b5563", marginBottom: "20px" }}>
                Omnibus ad quos hoc scriptum pervenerit, salutem in Domino sempiternam.
              </div>

              <h2 style={{ fontSize: "28px", fontWeight: "normal", fontVariant: "small-caps", color: "#1e3a8a", margin: "0 0 10px", letterSpacing: "0.05em" }}>
                Certificate of Highest Academic & Financial Delusion
              </h2>

              <div style={{ width: "150px", height: "2px", background: "#d97706", margin: "0 auto 20px" }}></div>

              <p style={{ fontSize: "14px", color: "#374151", margin: "0 0 15px", lineHeight: "1.6" }}>
                Be it known that by virtue of absolute zero cognitive oversight, the bearer of this digital screen has officially been awarded the prestigious doctoral degree in
              </p>

              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#b91c1c", fontStyle: "italic", marginBottom: "20px" }}>
                "Advanced Professional Wastefulness & Supreme Cart Recklessness"
              </div>

              <p style={{ fontSize: "13px", color: "#4b5563", maxWidth: "520px", margin: "0 auto 25px", lineHeight: "1.6" }}>
                Awarded with all rights, privileges, and lifetime mockery pertaining thereto, for successfully purchasing objects whose existence defies both physics and common sense.
              </p>

              {/* Malayalam Roast Box */}
              <div
                style={{
                  background: "#fef2f2",
                  border: "2px dashed #dc2626",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  maxWidth: "480px",
                  margin: "0 auto 25px",
                  textAlign: "left",
                  direction: "ltr"
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: "bold", color: "#dc2626", letterSpacing: "0.1em", marginBottom: "4px", fontFamily: "sans-serif" }}>
                  🚨 TRADITIONAL ELDER COMMENTARY (മലയാളം കമന്റ്):
                </div>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#991b1b", fontFamily: "sans-serif" }}>
                  "ഇവന്റെയൊക്കെ ഒരു കാര്യം... പത്താം ക്ലാസ്സിൽ ഒടുക്കത്തെ മാർക്കും വാങ്ങിയിട്ട് ഒടുവിൽ കാശുകൊണ്ടുപോയി ഈ കോമാളിത്തരം വാങ്ങാൻ ഇവൻ എന്ത് തേങ്ങയാടോ പഠിച്ചത്?" 🤦‍♂️🔥
                </p>
              </div>

              {/* Signatures Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "30px", padding: "0 20px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Brush Script MT, cursive", fontSize: "22px", color: "#1e3a8a" }}>Lord Lahel Vakkachan</div>
                  <div style={{ width: "130px", height: "1px", background: "#1f2937", margin: "4px auto" }}></div>
                  <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", fontFamily: "sans-serif" }}>Chancellor of Regrets</div>
                </div>

                <div style={{ fontSize: "40px", opacity: 0.8 }}>Sealed With Poverty</div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Brush Script MT, cursive", fontSize: "22px", color: "#1e3a8a" }}>Madhav-ettan's Ghost</div>
                  <div style={{ width: "130px", height: "1px", background: "#1f2937", margin: "4px auto" }}></div>
                  <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", fontFamily: "sans-serif" }}>Dean of Disappointment</div>
                </div>
              </div>
            </div>

            <button
              className="add-cart-button"
              style={{
                padding: "14px 20px",
              }}
              onClick={() => navigate("/payment")}
            >
              Proceed to payment →
            </button>
          </>
        )}
      </main>
    </div>
  );
}
