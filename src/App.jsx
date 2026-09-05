import { useState, useEffect } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Premium Air™',
    description: 'Freshly harvested air from absolutely nowhere.',
    price: 499,
    emoji: '💨',
  },
  {
    id: 2,
    name: 'Invisible Chair™',
    description: 'Sit comfortably. Or don"t. We cannot verify.',
    price: 1299,
    emoji: '🪑',
  },
  {
    id: 3,
    name: 'Quantum Rock™',
    description: 'A rock that exists until you look at it.',
    price: 2499,
    emoji: '🪨',
  },
  {
    id: 4,
    name: 'Premium Nothing™',
    description: 'Nothing. But premium.',
    price: 9999,
    emoji: '📦',
  },
]

function App() {
  useEffect(() => {
    const handleWheel = (e) => {
      window.scrollBy({
        top: -e.deltaY,
        behavior: 'auto',
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const addToCart = (product) => {
    setCart((current) => [...current, product])
    setMessage(`${product.name} has been added to your cart.`)

    setTimeout(() => {
      setMessage('')
    }, 2500)
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🛒</span>
          <span>UselessMart<span className="trademark">™</span></span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
        </div>

        <button className="cart-button">
          🛒 Cart
          <span className="cart-count">{cart.length}</span>
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
        <section className="hero-section" id="home">
          <div className="hero-badge">
            THE INTERNET'S LEAST USEFUL STORE
          </div>

          <h1>
            Buy things you
            <br />
            <span>don't need.</span>
          </h1>

          <p>
            We spent several months engineering products that solve
            absolutely none of your problems.
          </p>

          <div className="hero-actions">
            <a href="#products" className="primary-button">
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
        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-label">OUR COLLECTION</span>
              <h2>Products nobody asked for.</h2>
            </div>

            <div className="search-wrapper">
              🔍
              <input
                type="text"
                placeholder="Search for nothing..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span>{product.emoji}</span>
                  <div className="product-tag">USELESS</div>
                </div>

                <div className="product-info">
                  <div className="product-category">
                    QUESTIONABLE GOODS
                  </div>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="product-footer">
                    <strong>₹{product.price.toLocaleString()}</strong>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-search">
              <span>🤨</span>
              <h3>We couldn't find that.</h3>
              <p>
                Perhaps it is too useful for UselessMart™.
              </p>
            </div>
          )}
        </section>

        {/* Philosophy */}
        <section className="philosophy" id="about">
          <div className="philosophy-icon">⚠️</div>

          <div>
            <span className="section-label">OUR PROMISE</span>
            <h2>Your satisfaction is our inconvenience.</h2>
            <p>
              At UselessMart™, we believe shopping should be unnecessarily
              complicated. Every product is carefully designed to provide
              absolutely no measurable benefit to your life.
            </p>
          </div>
        </section>
      </main>

      {/* Cart preview */}
      {cart.length > 0 && (
        <div className="cart-preview">
          <div>
            <span className="cart-preview-icon">🛒</span>
            <div>
              <strong>{cart.length} useless item(s)</strong>
              <small>Waiting to ruin your finances</small>
            </div>
          </div>

          <button>
            Proceed to cart →
          </button>
        </div>
      )}

      <footer>
        <div>
          <strong>UselessMart™</strong>
          <span>Making bad decisions easier since 2026.</span>
        </div>

        <span>© 2026 UselessMart Industries</span>
      </footer>
    </div>
  )
}

export default App
