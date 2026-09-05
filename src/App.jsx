import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import OrderResult from './pages/OrderResult'
import products from './data/products'
import { useCart } from './context/CartContext'

// ==========================================
// DIABOLICAL PAGE TRANSITION MANAGER COMPONENT
// ==========================================
function PageTransitionManager({ children }) {
  const location = useLocation();
  const [transitionState, setTransitionState] = useState("idle");
  const [effectType, setEffectType] = useState("acid-trip");

  const effects = [
    "acid-trip",
    "chappal-void",
    "ransomware-flashbang",
    "product-sharmaji-son", // Brand new product-page specialized annoying transition
    "glitch",
    "matrix-wipe",
  ];

  useEffect(() => {
    // If we are navigating to a product details page, give it a high chance of the Sharma Ji Son special effect!
    const isProductRoute = location.pathname.startsWith('/product/');
    const chosenEffect = isProductRoute && Math.random() > 0.3
      ? "product-sharmaji-son"
      : effects[Math.floor(Math.random() * effects.length)];

    setEffectType(chosenEffect);
    setTransitionState("active");

    const timer = setTimeout(() => {
      setTransitionState("idle");
    }, 1400); // 1.4 seconds of psychological torment

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      <style>{`
        @keyframes acidTrip {
          0% { filter: hue-rotate(0deg) saturate(100%) blur(0px); transform: scale(1); }
          25% { filter: hue-rotate(90deg) saturate(800%) blur(2px) invert(0.2); transform: scale(1.03) rotate(2deg); }
          50% { filter: hue-rotate(220deg) saturate(1500%) blur(4px) contrast(300%); transform: scale(0.97) rotate(-2deg); }
          75% { filter: hue-rotate(310deg) saturate(500%) blur(1px); transform: scale(1.01); }
          100% { filter: none; transform: scale(1); }
        }

        @keyframes chappalSpin {
          0% { transform: translate(-100vw, -100vh) rotate(0deg) scale(0.2); opacity: 0; }
          50% { transform: translate(0, 0) rotate(1440deg) scale(2.5); opacity: 1; }
          100% { transform: translate(100vw, 100vh) rotate(2880deg) scale(0.5); opacity: 0; }
        }

        @keyframes ransomwareBlink {
          0%, 100% { background: #00ff00; color: #ff00ff; }
          50% { background: #ff00ff; color: #00ff00; }
        }

        @keyframes sharmajiFlash {
          0% { transform: scale(0.2) rotate(-15deg); opacity: 0; filter: blur(20px); }
          50% { transform: scale(1.1) rotate(5deg); opacity: 1; filter: blur(0px); }
          80% { transform: scale(0.95) rotate(-2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes pageGlitch {
          0% { transform: translate(0); filter: none; }
          20% { transform: translate(-10px, 5px) skew(10deg); filter: invert(0.8); }
          40% { transform: translate(10px, -5px) skew(-10deg); }
          100% { transform: translate(0); filter: none; }
        }

        @keyframes matrixWipe {
          0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); background: #00ff00; }
          50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          100% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); background: transparent; }
        }

        .transition-acid-trip {
          animation: acidTrip 1.2s ease-in-out forwards;
        }

        .transition-glitch {
          animation: pageGlitch 0.6s steps(4, end) forwards;
        }

        .transition-matrix-wipe {
          animation: matrixWipe 0.6s ease-in-out forwards;
        }
      `}</style>

      {/* Actual Page Content */}
      <div
        className={
          transitionState === "active" &&
          effectType !== "ransomware-flashbang" &&
          effectType !== "chappal-void" &&
          effectType !== "product-sharmaji-son"
            ? `transition-${effectType}`
            : ""
        }
        style={{
          width: "100%",
          minHeight: "100vh",
          filter: transitionState === "active" && effectType === "acid-trip" ? "hue-rotate(180deg) saturate(800%)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {children}
      </div>

      {/* Transition Effect 1: Chappal in Pitch Black Void */}
      {transitionState === "active" && effectType === "chappal-void" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000",
            zIndex: 999999,
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "120px",
              animation: "chappalSpin 1.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards",
              filter: "drop-shadow(0 0 30px #ffffff)",
            }}
          >
            🩴
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: "16px",
              letterSpacing: "0.2em",
              fontWeight: 900,
            }}
          >
            *A MOMENT OF SILENCE FOR YOUR DIGNITY*
          </div>
        </div>
      )}

      {/* Transition Effect 2: The Ransomware Flashbang */}
      {transitionState === "active" && effectType === "ransomware-flashbang" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            animation: "ransomwareBlink 0.15s infinite",
            display: "grid",
            placeItems: "center",
            padding: "20px",
            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          <div
            style={{
              background: "#000",
              color: "#00ff00",
              border: "6px solid #ff00ff",
              padding: "30px",
              maxWidth: "550px",
              width: "100%",
              boxShadow: "0 0 50px #ff00ff",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "900", marginBottom: "15px", color: "#ff0000" }}>
              ⚠️ CRITICAL SYSTEM LOCKDOWN ⚠️
            </div>
            <div style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
              Encrypting your search history to send to your relatives. Please wait... <br /><br />
              <span style={{ color: "#ffff00" }}>[PROGRESS: 99% - DOWNLOADING CHITHAPPAN_WHATSAPP_FORWARD.EXE]</span>
            </div>
            <div style={{ fontSize: "11px", color: "#888", borderTop: "1px dashed #444", paddingTop: "10px" }}>
              UselessMart Ransomware v4.20 • No backups found. Good luck facing your family.
            </div>
          </div>
        </div>
      )}

      {/* Transition Effect 3: The Sharma Ji's Son Product Page Ambush */}
      {transitionState === "active" && effectType === "product-sharmaji-son" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 999999,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fffbeb",
              border: "6px solid #b45309",
              borderRadius: "16px",
              padding: "30px",
              maxWidth: "480px",
              textAlign: "center",
              animation: "sharmajiFlash 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
              boxShadow: "0 25px 50px rgba(180, 83, 9, 0.4)",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>🏆👨‍🎓</div>
            <div style={{ fontSize: "11px", fontWeight: "900", color: "#b45309", letterSpacing: "0.2em", marginBottom: "6px" }}>
              UNSOLICITED PARENTAL COMPARISON ALERT
            </div>
            <h2 style={{ fontSize: "22px", color: "#78350f", margin: "0 0 10px", fontWeight: "900" }}>
              LOOKING AT USELESS PRODUCTS AGAIN?
            </h2>
            <p style={{ fontSize: "13px", color: "#92400e", lineHeight: "1.6", margin: "0 0 16px" }}>
              &quot;Sharma Ji&apos;s son cleared UPSC, cleared GATE, built a rocket, and bought a house by your age. And here you are inspecting pixelated garbage online.&quot;
            </p>
            <div style={{ fontSize: "11px", fontStyle: "italic", color: "#b45309", fontWeight: "bold" }}>
              Loading your disappointing product details anyway... 🤦‍♂️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const navigate = useNavigate()
  const { cart } = useCart()

  const [search, setSearch] = useState('')
  const [message] = useState('')

  useEffect(() => {
    const handleWheel = (e) => {
      window.scrollBy({
        top: -e.deltaY,
        behavior: 'auto',
      })
    }

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🛒</span>
          <span>
            UselessMart
            <span className="trademark">™</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
        </div>

        <button
          className="cart-button"
          onClick={() => navigate('/cart')}
        >
          🛒 Cart
          <span className="cart-count">
            {cart.length}
          </span>
        </button>
      </nav>

      {/* Notification */}
      {message && (
        <div className="notification">
          ✓ {message}
        </div>
      )}

      {/* Hero */}
      <main>
        <section
          className="hero-section"
          id="home"
        >
          <div className="hero-badge">
            THE INTERNET'S LEAST USEFUL STORE
          </div>

          <h1>
            Buy things you
            <br />
            <span>don't need.</span>
          </h1>

          <p>
            We spent several months engineering products
            that solve absolutely none of your problems.
          </p>

          <div className="hero-actions">
            <a
              href="#products"
              className="primary-button"
            >
              Browse Useless Products →
            </a>

            <span className="hero-note">
              ⭐ Trusted by nobody
            </span>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div>
            <strong>4</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>₹0</strong>
            <span>Value Provided</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Uselessness</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Regret</span>
          </div>
        </section>

        {/* Products */}
        <section
          className="products-section"
          id="products"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">
                OUR COLLECTION
              </span>
              <h2>
                Products nobody asked for.
              </h2>
            </div>

            <div className="search-wrapper">
              🔍
              <input
                type="text"
                placeholder="Search for nothing..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >
                <div
                  className="product-image"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <span>
                    {product.emoji}
                  </span>
                  <div className="product-tag">
                    USELESS
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-category">
                    {product.category.toUpperCase()}
                  </div>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <div className="product-footer">
                    <strong>
                      ₹{product.price.toLocaleString()}
                    </strong>

                    <button
                      className="add-button"
                      onClick={() =>
                        navigate(
                          `/product/${product.id}`,
                        )
                      }
                    >
                      View product →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty search */}
          {filteredProducts.length === 0 && (
            <div className="empty-search">
              <span>🤨</span>
              <h3>
                We couldn't find that.
              </h3>
              <p>
                Perhaps it is too useful for
                UselessMart™.
              </p>
            </div>
          )}
        </section>

        {/* Philosophy */}
        <section
          className="philosophy"
          id="about"
        >
          <div className="philosophy-icon">
            ⚠️
          </div>

          <div>
            <span className="section-label">
              OUR PROMISE
            </span>

            <h2>
              Your satisfaction is our inconvenience.
            </h2>

            <p>
              At UselessMart™, we believe shopping
              should be unnecessarily complicated.
              Every product is carefully designed to
              provide absolutely no measurable benefit
              to your life.
            </p>
          </div>
        </section>
      </main>

      {/* Cart preview */}
      {cart.length > 0 && (
        <div className="cart-preview">
          <div>
            <span className="cart-preview-icon">
              🛒
            </span>

            <div>
              <strong>
                {cart.length} useless item(s)
              </strong>
              <small>
                Waiting to ruin your finances
              </small>
            </div>
          </div>

          <button
            onClick={() => navigate('/cart')}
          >
            Proceed to cart →
          </button>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div>
          <strong>
            UselessMart™
          </strong>
          <span>
            Making bad decisions easier since 2026.
          </span>
        </div>

        <span>
          © 2026 UselessMart Industries
        </span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <PageTransitionManager>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-result" element={<OrderResult />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </PageTransitionManager>
  )
}

export default App
