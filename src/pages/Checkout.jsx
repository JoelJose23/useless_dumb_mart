import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="product-details-page">
      <div className="product-warning">
        <AlertTriangle size={15} />
        <span>CHECKOUT IS A SOCIAL CONSTRUCT. BUT OKAY.</span>
      </div>
      <main className="product-container">
        <button className="back-button" onClick={() => navigate("/cart")}>
          <ArrowLeft size={18} />
          Back to cart
        </button>
        <div className="breadcrumb">
          Home / Cart / <strong>Checkout</strong>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <ShoppingBag size={28} />
          <h1 style={{ margin: 0, fontSize: 32 }}>Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", border: "1px solid #ddd" }}>
            <p style={{ color: "#777" }}>Your cart is empty. Nothing to checkout.</p>
            <button className="add-cart-button" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
              Go shopping
            </button>
          </div>
        ) : (
          <>
            <div style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 24 }}>
              <h3>Order summary — {cart.length} useless item(s)</h3>
              <p style={{ color: "#555" }}>Total: ₹{total.toLocaleString()}</p>
              <p style={{ fontSize: 12, color: "#999" }}>
                This is where you would normally pay. But this is UselessMart™, so...
              </p>
            </div>
            <button
              className="add-cart-button"
              style={{ padding: "14px 20px" }}
              onClick={() => {
                clearCart();
                alert("Order placed! (Not really, but your cart is cleared)");
                navigate("/");
              }}
            >
              Place useless order →
            </button>
          </>
        )}
      </main>
    </div>
  );
}
