import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "../context/CartContext";

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

  /*
   * The button gets exactly FIVE chances to escape.
   *
   * After five dodges, it finally accepts its fate
   * and becomes a normal clickable checkout button.
   */
  const handleMouseMove = (e) => {
    if (dodgeCount >= 5) {
      return;
    }

    const btn = e.currentTarget.getBoundingClientRect();

    const btnCenterX = btn.left + btn.width / 2;
    const btnCenterY = btn.top + btn.height / 2;

    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;

    const distance = Math.sqrt(
      distX * distX + distY * distY
    );

    if (distance < 120) {
      const angle = Math.atan2(distY, distX);

      /*
       * Each escape gets progressively more dramatic.
       */
      const jumpDistance = 180;

      const newX =
        btnOffset.x -
        Math.cos(angle) * jumpDistance;

      const newY =
        btnOffset.y -
        Math.sin(angle) * jumpDistance;

      setBtnOffset({
        x: newX,
        y: newY,
      });

      const newDodgeCount = dodgeCount + 1;

      setDodgeCount(newDodgeCount);

      if (newDodgeCount >= 5) {
        setTauntText(
          "Fine. You win. Proceed to checkout →"
        );
      } else {
        setTauntText(
          taunts[
            Math.floor(
              Math.random() * taunts.length
            )
          ]
        );
      }
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0),
    0
  );

  /*
   * EMPTY CART
   */

  if (!cart || cart.length === 0) {
    return (
      <div className="product-details-page">

        <div className="product-warning">
          <AlertTriangle size={15} />

          <span>
            YOUR CART IS AS EMPTY AS OUR PROMISES.
          </span>
        </div>

        <main className="product-container">

          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to shopping
          </button>

          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >

            <div
              style={{
                fontSize: 50,
                marginBottom: 16,
              }}
            >
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p
              style={{
                color: "#777",
                marginTop: 8,
              }}
            >
              You haven't added anything useless yet.
            </p>

            <button
              className="add-cart-button"
              style={{
                marginTop: 24,
                padding: "12px 24px",
              }}
              onClick={() => navigate("/")}
            >
              Browse useless products
            </button>

          </div>

        </main>

      </div>
    );
  }

  /*
   * CART
   */

  return (
    <div className="product-details-page">

      {/* WARNING */}

      <div className="product-warning">

        <AlertTriangle size={15} />

        <span>
          CONGRATULATIONS — YOUR CART NOW CONTAINS REGRET.
        </span>

      </div>

      <main className="product-container">

        {/* BACK */}

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Continue shopping
        </button>

        {/* BREADCRUMB */}

        <div className="breadcrumb">

          Home /{" "}

          <strong>
            Cart ({cart.length})
          </strong>

        </div>

        {/* TITLE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >

          <ShoppingBag size={28} />

          <h1
            style={{
              margin: 0,
              fontSize: 32,
            }}
          >
            Your Useless Cart
          </h1>

          <span
            style={{
              color: "#777",
              fontSize: 14,
            }}
          >
            {cart.length} item(s)
          </span>

        </div>

        {/* CART LAYOUT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.9fr",
            gap: 32,
            alignItems: "start",
          }}
          className="cart-layout"
        >

          {/* ITEMS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >

            {cart.map((item, index) => (

              <div
                key={
                  item.id
                    ? `${item.id}-${index}`
                    : index
                }
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 16,
                  background: "#fff",
                  border: "1px solid #ddd",
                  alignItems: "center",
                }}
              >

                {/* PRODUCT ICON */}

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

                {/* PRODUCT INFO */}

                <div
                  style={{
                    flex: 1,
                  }}
                >

                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#777",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.category
                      ? item.category.toUpperCase()
                      : "USELESS GOODS"}
                  </div>

                  <strong>
                    {item.name ||
                      "Unnamed Nothing"}
                  </strong>

                  <div
                    style={{
                      color: "#777",
                      fontSize: 13,
                    }}
                  >
                    {item.description}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontWeight: 800,
                    }}
                  >
                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString()}
                  </div>

                </div>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeFromCart(index)
                  }
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

            {/* CLEAR */}

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

          {/* ORDER SUMMARY */}

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              padding: 20,
              position: "sticky",
              top: 90,
            }}
          >

            <h3
              style={{
                margin: "0 0 16px",
              }}
            >
              Order summary
            </h3>

            {/* SUBTOTAL */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: "#555",
              }}
            >

              <span>
                Subtotal ({cart.length} items)
              </span>

              <span>
                ₹{total.toLocaleString()}
              </span>

            </div>

            {/* DELIVERY */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: "#555",
              }}
            >

              <span>
                Delivery
              </span>

              <span
                style={{
                  color: "#999",
                }}
              >
                Eventually
              </span>

            </div>

            {/* TOTAL */}

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

              <span>
                Total
              </span>

              <span>
                ₹{total.toLocaleString()}
              </span>

            </div>

            {/* =================================================
                CHECKOUT BUTTON
                ================================================= */}

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
                onMouseMove={handleMouseMove}
                onClick={() =>
                  navigate("/checkout")
                }
                style={{
                  padding: "12px 18px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",

                  /*
                   * Normal position initially.
                   *
                   * Once it starts dodging, it becomes
                   * fixed to the viewport and can escape.
                   */
                  position:
                    dodgeCount > 0
                      ? "fixed"
                      : "relative",

                  left:
                    dodgeCount > 0
                      ? "50%"
                      : "auto",

                  top:
                    dodgeCount > 0
                      ? "50%"
                      : "auto",

                  transform:
                    dodgeCount > 0
                      ? `translate(
                          calc(-50% + ${btnOffset.x}px),
                          calc(-50% + ${btnOffset.y}px)
                        )`
                      : "none",

                  transition:
                    "transform 0.15s ease-out",

                  zIndex:
                    dodgeCount > 0
                      ? 9999
                      : "auto",
                }}
              >
                {tauntText}
                {dodgeCount < 5 && " 🏃‍♂️💨"}
              </button>

            </div>

            {/* DISCLAIMER */}

            <p
              style={{
                fontSize: 11,
                color: "#999",
                marginTop: 10,
                lineHeight: 1.5,
              }}
            >
              By checking out you agree that
              satisfaction is not guaranteed,
              not expected, and not our problem.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
