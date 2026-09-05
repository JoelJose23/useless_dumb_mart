import { useState, useEffect, Children } from 'react'

export default function GravityScroll({ children }) {
  const childArray = Children.toArray(children)
  const [items, setItems] = useState([])

  useEffect(() => {
    // Initialize items with their original index and position
    const initialItems = childArray.map((child, index) => ({
      id: index,
      node: child,
      y: 0,
      x: 0,
      isFalling: false,
      dragging: false,
    }))
    setItems(initialItems)
  }, [children])

  useEffect(() => {
    const handleScroll = () => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          isFalling: true,
          y: window.innerHeight - 150 + (Math.random() * 80 - 40),
          x: (Math.random() - 0.5) * 100,
        }))
      )
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDragStart = (id, e) => {
    // Let buttons inside the item still be clickable if they aren't dragging
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return

    e.preventDefault()
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, dragging: true } : item))
    )

    const onMouseMove = (moveEvent) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                x: moveEvent.clientX - window.innerWidth / 2,
                y: Math.max(0, moveEvent.clientY - 100),
              }
            : item
        )
      )
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, dragging: false } : item))
      )
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div style={{ position: 'relative', minHeight: '200vh', overflow: 'hidden' }}>
      <div style={{ padding: '0px', maxWidth: '800px', margin: '0 auto' }}>
        {items.map((item) => (
          <div
            key={item.id}
            onMouseDown={(e) => handleDragStart(item.id, e)}
            style={{
              position: item.isFalling ? 'fixed' : 'relative',
              left: item.isFalling ? `calc(50% + ${item.x}px)` : 'auto',
              top: item.isFalling ? `${item.y}px` : 'auto',
              transform: item.isFalling ? 'translateX(-50%)' : 'none',
              transition: item.dragging ? 'none' : 'top 0.8s cubic-bezier(0.5, 0, 0.8, 1), left 0.8s ease',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '15px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              cursor: 'grab',
              userSelect: 'none',
              zIndex: item.dragging ? 1000 : 100,
            }}
          >
            {item.node}
          </div>
        ))}
      </div>
    </div>
  )
}
