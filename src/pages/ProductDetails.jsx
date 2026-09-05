import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcademicCaptcha from "../components/AcademicCaptcha";
import FakeLoader from "../components/FakeLoader";
import MadhavEttanPopup from "../components/MadhavEttanPopup";
import Ads from "../components/Ads";
import { useCart } from "../context/CartContext";

import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  AlertTriangle,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import products from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const product =
    products.find((item) => item.id === Number(id)) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showUselessInfo, setShowUselessInfo] = useState(false);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /*
   * Add to Cart
   *
   * The CAPTCHA is always shown first.
   * The secret bypass phrase is handled inside
   * AcademicCaptcha.jsx.
   */
  const handleAddToCart = () => {
    setShowCaptcha(true);
  };

  /*
   * Once either:
   * 1. The CAPTCHA is successfully solved
   * 2. The secret phrase "I am Useless" is entered
   *
   * AcademicCaptcha calls onSuccess().
   */
  const handleCaptchaSuccess = () => {
    setShowCaptcha(false);
    setShowLoader(true);
  };

  /*
   * Fake loader completion
   */
  const handleLoaderComplete = useCallback(() => {
    addToCart(product, quantity);
    setShowLoader(false);
    navigate("/cart");
  }, [addToCart, navigate, product, quantity]);

  if (!product) {
    return (
      <div className="product-details-page">
        <main className="product-container">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back to products
          </button>

          <h2>Product not found.</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <MadhavEttanPopup product={product} />

      <Ads />

      {/* =========================
          ACADEMIC CAPTCHA
         ========================= */}

      {showCaptcha && (
        <AcademicCaptcha
          onSuccess={handleCaptchaSuccess}
          onFailure={() => {}}
        />
      )}

      {/* =========================
          FAKE LOADER
         ========================= */}

      {showLoader && (
        <FakeLoader
          onComplete={handleLoaderComplete}
        />
      )}

      {/* =========================
          WARNING
         ========================= */}

      <div className="product-warning">
        <AlertTriangle size={15} />

        <span>
          IMPORTANT: By viewing this product you have accepted
          absolutely nothing.
        </span>
      </div>

      <main className="product-container">

        {/* =========================
            BACK BUTTON
           ========================= */}

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back to products
        </button>

        {/* =========================
            BREADCRUMB
           ========================= */}

        <div className="breadcrumb">
          Home / Products / {product.category} /{" "}
          <strong>{product.name}</strong>
        </div>

        {/* =========================
            PRODUCT MAIN
           ========================= */}

        <section className="product-main">

          {/* PRODUCT IMAGE */}

          <div className="product-image-section">

            <div className="product-image-box">

              <div className="product-image-placeholder">

                <Package
                  size={90}
                  strokeWidth={1}
                />

                <span>
                  PRODUCT IMAGE
                </span>

                <small>
                  Image unavailable due to budget constraints.
                </small>

              </div>

              <div className="image-badge">
                100% REAL*
              </div>

            </div>

            <div className="image-disclaimer">
              *Realness not legally defined.
            </div>

          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-info">

            <div className="category-label">
              {product.category}
            </div>

            <h1>
              {product.name}
            </h1>

            {/* RATING */}

            <div className="rating-row">

              <div className="stars">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    fill="currentColor"
                  />
                ))}

              </div>

              <span>
                {product.rating} (
                {product.reviews.toLocaleString()}
                reviews)
              </span>

              <span className="verified">
                ✓ Verified-ish
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="product-description">
              {product.longDescription ||
                product.description}
            </p>

            {/* PRICE */}

            <div className="price-section">

              <span className="old-price">
                ₹{product.oldPrice}
              </span>

              <span className="product-price">
                ₹{product.price}
              </span>

              <span className="discount">
                {Math.round(
                  ((product.oldPrice - product.price) /
                    product.oldPrice) *
                    100
                )}
                % OFF
              </span>

            </div>

            {/* PRICE WARNING */}

            <div className="price-warning">

              <AlertTriangle size={15} />

              Price may change while you are looking at it.

            </div>

            {/* STOCK */}

            <div className="stock-status">

              <span className="stock-dot" />

              Only {product.stock} left in stock.

              <span className="fake-stock-warning">
                Probably.
              </span>

            </div>

            {/* PURCHASE ROW */}

            <div className="purchase-row">

              <div className="quantity-selector">

                <button
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                >
                  <Plus size={16} />
                </button>

              </div>

              {/* ADD TO CART */}

              <button
                className="add-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

            </div>

            {/* SECONDARY ACTIONS */}

            <div className="secondary-actions">

              <button
                onClick={() =>
                  setLiked(!liked)
                }
              >
                <Heart
                  size={17}
                  fill={
                    liked
                      ? "currentColor"
                      : "none"
                  }
                />

                {liked
                  ? "You like this. Weird."
                  : "Add to wishlist"}
              </button>

              <button
                onClick={() =>
                  alert(
                    "Congratulations. You shared nothing."
                  )
                }
              >
                <Share2 size={17} />
                Share product
              </button>

            </div>

            {/* SERVICES */}

            <div className="service-grid">

              <div>
                <Truck size={20} />

                <span>
                  <strong>
                    Fast Delivery
                  </strong>

                  <small>
                    {product.delivery}
                  </small>
                </span>
              </div>

              <div>
                <ShieldCheck size={20} />

                <span>
                  <strong>
                    Secure Purchase
                  </strong>

                  <small>
                    Probably secure
                  </small>
                </span>
              </div>

              <div>
                <RotateCcw size={20} />

                <span>
                  <strong>
                    Easy Returns
                  </strong>

                  <small>
                    Subject to 47 conditions
                  </small>
                </span>
              </div>

              <div>
                <Package size={20} />

                <span>
                  <strong>
                    Premium Packaging
                  </strong>

                  <small>
                    Box included*
                  </small>
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* =========================
            SPECIFICATIONS
           ========================= */}

        <section className="product-specs">

          <div className="section-heading">

            <span>
              TECHNICAL INFORMATION
            </span>

            <h2>
              Specifications nobody asked for.
            </h2>

          </div>

          <div className="spec-grid">

            <div>
              <span>SKU</span>
              <strong>{product.sku}</strong>
            </div>

            <div>
              <span>Weight</span>
              <strong>{product.weight}</strong>
            </div>

            <div>
              <span>Dimensions</span>
              <strong>{product.dimensions}</strong>
            </div>

            <div>
              <span>Colour</span>
              <strong>{product.color}</strong>
            </div>

            <div>
              <span>Material</span>
              <strong>{product.material}</strong>
            </div>

            <div>
              <span>Warranty</span>
              <strong>{product.warranty}</strong>
            </div>

            <div>
              <span>Manufacturing Country</span>
              <strong>Earth</strong>
            </div>

            <div>
              <span>Operating Temperature</span>
              <strong>Probably normal</strong>
            </div>

          </div>

        </section>

        {/* =========================
            PRODUCT TABS
           ========================= */}

        <section className="product-tabs">

          <div className="tabs-header">

            <button
              className={
                activeTab === "description"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("description")
              }
            >
              Description
            </button>

            <button
              className={
                activeTab === "reviews"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("reviews")
              }
            >
              Reviews ({product.reviews})
            </button>

            <button
              className={
                activeTab === "shipping"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("shipping")
              }
            >
              Shipping
            </button>

            <button
              className={
                activeTab === "useless"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("useless")
              }
            >
              Useless Information
            </button>

          </div>

          <div className="tab-content">

            {/* DESCRIPTION */}

            {activeTab === "description" && (
              <>
                <h3>
                  About this product
                </h3>

                <p>
                  {product.longDescription ||
                    product.description}
                </p>

                <ul>
                  {product.nonsense.map(
                    (item, index) => (
                      <li key={index}>
                        <Check size={15} />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </>
            )}

            {/* REVIEWS */}

            {activeTab === "reviews" && (
              <div className="fake-reviews">

                <h3>
                  What our customers are saying
                </h3>

                <div className="review">

                  <strong>
                    ★★★★★ — Ravi K.
                  </strong>

                  <p>
                    "I don't know what I bought
                    but I bought it again."
                  </p>

                </div>

                <div className="review">

                  <strong>
                    ★★★★★ — Anonymous
                  </strong>

                  <p>
                    "Delivery was late but the
                    product was also useless,
                    so it didn't matter."
                  </p>

                </div>

                <div className="review">

                  <strong>
                    ☆☆☆☆☆ — Definitely Real Person
                  </strong>

                  <p>
                    "Worst experience of my life.
                    Will purchase again."
                  </p>

                </div>

              </div>
            )}

            {/* SHIPPING */}

            {activeTab === "shipping" && (
              <div>

                <h3>
                  Shipping Information
                </h3>

                <p>
                  Your order will be shipped
                  using our proprietary logistics
                  system known as{" "}
                  <strong>
                    Throw & Hope™
                  </strong>.
                </p>

                <ul>

                  <li>
                    Processing: 3–17 business days
                  </li>

                  <li>
                    Dispatch: When we remember
                  </li>

                  <li>
                    Transit: Somewhere between here
                    and there
                  </li>

                  <li>
                    Delivery: Eventually
                  </li>

                  <li>
                    Tracking: Emotionally unavailable
                  </li>

                </ul>

              </div>
            )}

            {/* USELESS INFORMATION */}

            {activeTab === "useless" && (
              <div>

                <h3>
                  Extremely Important Information
                </h3>

                <p>
                  Congratulations. You clicked
                  the tab nobody needed.
                </p>

                <button
                  className="useless-reveal"
                  onClick={() =>
                    setShowUselessInfo(
                      !showUselessInfo
                    )
                  }
                >
                  {showUselessInfo
                    ? "Hide useless information"
                    : "Reveal useless information"}
                </button>

                {showUselessInfo && (
                  <div className="useless-info-box">

                    <p>
                      • This product exists.
                    </p>

                    <p>
                      • You are currently looking
                      at it.
                    </p>

                    <p>
                      • The website knows you are
                      looking at it.
                    </p>

                    <p>
                      • The website cannot help you.
                    </p>

                    <p>
                      • You have spent time reading
                      this.
                    </p>

                    <p>
                      • We appreciate your contribution.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>

        </section>

        {/* =========================
            FINAL WARNING
           ========================= */}

        <section className="final-product-warning">

          <AlertTriangle size={22} />

          <div>

            <strong>
              One last thing.
            </strong>

            <p>
              Once you purchase this product,
              UselessMart™ accepts no responsibility
              for satisfaction, dissatisfaction,
              confusion, existential crises,
              geological consequences, or
              unexpected rocks.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
}
