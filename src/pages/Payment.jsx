import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpChallenge from "../components/OtpChallenge";
import FakeLoader from "../components/FakeLoader";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showOtp, setShowOtp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const delivery = cart.length > 0 ? 99 : 0;
  const total = subtotal + delivery;

  const handlePayment = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };

  const handleOtpSuccess = () => {
    setShowOtp(false);
    setShowLoader(true);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">

        <div className="payment-top">
          <button onClick={() => navigate("/checkout")}>
            ← Back
          </button>

          <div className="secure-label">
            🔒 Secure Payment
          </div>
        </div>

        <h1>Complete Payment</h1>
        <p className="payment-subtitle">
          Enter your payment details to complete your order.
        </p>

        <form onSubmit={handlePayment}>

          <div className="payment-section">
            <h2>Payment Method</h2>

            <div className="payment-tabs">
              <button
                type="button"
                className={paymentMethod === "card" ? "active" : ""}
                onClick={() => setPaymentMethod("card")}
              >
                💳 Card
              </button>

              <button
                type="button"
                className={paymentMethod === "upi" ? "active" : ""}
                onClick={() => setPaymentMethod("upi")}
              >
                UPI
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="payment-section">

              <label>Card Number</label>
              <input
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />

              <div className="payment-row">
                <div>
                  <label>Expiry Date</label>
                  <input
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div>
                  <label>CVV</label>
                  <input
                    required
                    placeholder="123"
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>

              <label>Cardholder Name</label>
              <input
                required
                placeholder="John Doe"
              />

            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="payment-section">
              <label>UPI ID</label>
              <input
                required
                placeholder="example@upi"
              />
            </div>
          )}

          <div className="payment-summary">
            <div>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div>
              <span>Delivery</span>
              <span>₹{delivery.toLocaleString()}</span>
            </div>

            <div className="payment-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString()}</strong>
            </div>
          </div>

          <button className="pay-button" type="submit">
            PAY ₹{total.toLocaleString()}
          </button>

        </form>
      </div>

      {showOtp && (
        <OtpChallenge onSuccess={handleOtpSuccess} />
      )}

      {showLoader && (
        <FakeLoader
          onComplete={() => {
            setShowLoader(false);
            navigate("/order-result");
          }}
        />
      )}
    </div>
  );
}
