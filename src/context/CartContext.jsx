import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCart((current) => [
      ...current,
      ...Array(quantity).fill(product),
    ])
  }

  const removeFromCart = (index) => {
    setCart((current) =>
      current.filter((_, i) => i !== index)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
