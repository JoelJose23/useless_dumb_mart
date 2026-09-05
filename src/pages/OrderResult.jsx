import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ShoppingBag, RefreshCcw, ShieldAlert, XCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import therockImage from "../assets/therock.jpg";

export default function OrderResult() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [deliveryProgress, setDeliveryProgress] = useState(12);
  const [deliveryStatusText, setDeliveryStatusText] = useState("Driver is currently fighting an auto-rickshaw driver in Kochi traffic.");
  const [showScamModal, setShowScamModal] = useState(false);

  const statuses = [
    "Driver stopped for strong evening chai and parippu vada. ☕",
    "Local neighborhood stray dogs have hijacked your delivery truck. 🐕",
    "Driver got lost because Google Maps pointed to a coconut tree in Wayanad. 🌴",
    "Your package was opened by Sharma Ji's uncle for 'quality inspection'. 📦",
    "Driver is taking a 4-hour afternoon nap because it's too hot. 😴",
    "Your useless item has been accidentally donated to a local temple festival. 🚩",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setDeliveryProgress((prev) => {
        if (prev >= 99) return 99;
        return prev + Math.floor(Math.random() * 3);
      });
    }, 1500);

    const statusInterval = setInterval(() => {
      const randomMsg = statuses[Math.floor(Math.random() * statuses.length)];
      setDeliveryStatusText(randomMsg);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  return (
    <div className="product-details-page">
      <div className="product-warning" style={{ background: "#dc2626", color: "#fff" }}>
        <AlertTriangle size5={15} />
        <span>ORDER PLACED. THERE IS ABSOLUTELY NO TURNING BACK NOW.</span>
      </div>

      <main className="product-container">
        <div className="breadcrumb">
          Home / Cart / Checkout / <strong>Order Result</strong>
        </div>

        {/* The Rock Special Grand Congratulations Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
            border: "4px solid #ca8a04",
            borderRadius: "16px",
            padding: "32px 24px",
            textAlign: "center",
            marginBottom: "30px",
            boxShadow: "0 10px 30px rgba(202, 138, 4, 0.3)",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 16px",
              border: "4px solid #ca8a04",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={therockImage}
              alt="Dwayne The Rock Johnson"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <h1 style={{ fontSize: "28px", color: "#713f12", margin: "0 0 8px", fontWeight: "900" }}>
            CONGRATULATIONS! YOU WON THE ROCK ORDER! 🪨🔥
          </h1>
          <p style={{ fontSize: "15px", color: "#854d0e", maxWidth: "550px", margin: "0 auto", lineHeight: "1.6" }}>
            By some miracle of pure stupidity and bad life choices, you are now the proud owner of Dwayne &quot;The Rock&quot; Johnson&apos;s spiritual approval (and an absolute waste of ₹{total.toLocaleString()}). Your bank account is flatlining, but hey, <i>Can you smell what The Rock is cooking?</i> (It&apos;s your financial future burning down).
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "2px solid #ddd",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#111" }}>
              🚚 Live Delivery Status (Maybe?)
            </h3>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#dc2626" }}>
              {deliveryProgress}% Complete (Stuck)
            </span>
          </div>

          <div style={{ width: "100%", height: "14px", background: "#f3f4f6", borderRadius: "7px", overflow: "hidden", marginBottom: "16px", border: "1px solid #e5e7eb" }}>
            <div
              style={{
                width: `${deliveryProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #f59e0b, #dc2626)",
                transition: "width 0.5s ease-out"
              }}
            />
          </div>

          <div
            style={{
              background: "#fef2f2",
              border: "1px dashed #dc2626",
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🛵</span>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: "#991b1b" }}>
              {deliveryStatusText}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "2px solid #ddd",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>Receipt of Absolute Regret</h3>

          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #eee", marginBottom: "12px", fontSize: "14px", color: "#555" }}>
            <span>Items Purchased:</span>
            <span style={{ fontWeight: "bold", color: "#111" }}>{cart.length} useless item(s)</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #eee", marginBottom: "16px", fontSize: "14px", color: "#555" }}>
            <span>Total Financial Damage:</span>
            <span style={{ fontWeight: "900", color: "#dc2626", fontSize: "16px" }}>₹{total.toLocaleString()}</span>
          </div>

          <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", background: "#f9fafb", padding: "12px", borderRadius: "8px" }}>
            <strong>Important Delivery Disclaimer:</strong> Because you live in India, your package will not arrive until at least three neighbors ask your mother what you bought, one relative calls to give unsolicited career advice, and an auto driver cancels on you twice.
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              className="add-cart-button"
              style={{ flex: 1, padding: "14px", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", border: "none", borderRadius: "6px" }}
              onClick={() => {
                clearCart();
                navigate("/");
              }}
            >
              <RefreshCcw size={16} />
              Make Another Terrible Mistake (Buy More)
            </button>

            <button
              style={{
                padding: "14px 24px",
                background: "#fff",
                border: "2px solid #111",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Run Away Home 🏃‍♂️
            </button>
          </div>

          {/* Cancel Order / Refund Button */}
          <button
            style={{
              padding: "14px",
              background: "#fee2e2",
              color: "#991b1b",
              border: "2px dashed #dc2626",
              borderRadius: "6px",
              fontWeight: "900",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => setShowScamModal(true)}
          >
            🚨 CANCEL ORDER OR REQUEST REFUND (TRY IF YOU DARE) ❌
          </button>
        </div>
      </main>

      {/* Premium Cancellation Membership Scam Modal */}
      {showScamModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "grid",
            placeItems: "center",
            zIndex: 99999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "6px solid #dc2626",
              borderRadius: "16px",
              maxWidth: "480px",
              width: "100%",
              padding: "32px",
              textAlign: "center",
              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
              animation: "madhavIn 0.2s ease-out",
            }}
          >
            <div style={{ fontSize: "45px", marginBottom: "8px" }}>🤡💸⚠️</div>

            <h2 style={{ fontSize: "22px", color: "#991b1b", margin: "0 0 12px", fontWeight: "900" }}>
              WANT TO CANCEL? PAY THE TAX OF FOOLISHNESS!
            </h2>

            <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6", marginBottom: "20px" }}>
              To even <em>think</em> about canceling this catastrophic order, you must first upgrade to our exclusive <strong>VIP Premium Absolute Loser Cancellation Membership</strong> for just <strong>₹50,000 INR</strong> upfront.
            </p>

            <div
              style={{
                background: "#fef2f2",
                border: "2px dashed #dc2626",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "12px",
                color: "#7f1d1d",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "left",
                lineHeight: "1.6",
              }}
            >
              ⚠️ <strong>Harsh Legal Reality Check:</strong> By attempting to cancel, you acknowledge that UselessMart™ bears zero responsibility for your emotional breakdowns, depleted savings accounts, or your parents disowning you. Furthermore, <strong>we are not liable for any financial losses</strong> incurred. Also, the ₹50,000 cancellation fee is non-refundable because administrative paperwork in India takes forever.
            </div>

            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <button
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "6px",
                  fontWeight: "900",
                  cursor: "pointer",
                  fontSize: "14px",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                }}
                onClick={() => {
                  alert("Are you Dumb?");
                  setShowScamModal(false);
                }}
              >
                Pay ₹50,000 & Continue Suffering 💳
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "#6b7280",
                  border: "none",
                  padding: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={() => setShowScamModal(false)}
              >
                Nevermind, I accept my permanent financial ruin 🕯️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
