type CartItem = { productId: string; quantity: number }

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('raj-ratanm-cart') || '[]')
  } catch { return [] }
}

export const addToCart = (productId: string, quantity: number = 1): void => {
  const cart = getCart()
  const existing = cart.find(i => i.productId === productId)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ productId, quantity })
  }
  localStorage.setItem('raj-ratanm-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export const removeFromCart = (productId: string): void => {
  const cart = getCart().filter(i => i.productId !== productId)
  localStorage.setItem('raj-ratanm-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export const updateQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) { removeFromCart(productId); return }
  const cart = getCart().map(i => 
    i.productId === productId ? { ...i, quantity } : i
  )
  localStorage.setItem('raj-ratanm-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export const clearCart = (): void => {
  localStorage.removeItem('raj-ratanm-cart')
  window.dispatchEvent(new Event('cart-updated'))
}

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}
