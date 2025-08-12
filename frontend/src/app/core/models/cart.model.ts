export interface CartItem {
  id: number
  quantity: number
  unitPrice: number
  price: number
  productName: string
  productId: number
  productImage?: string
  variant?: string
  variantId?: number
}

export interface Cart {
  id?: number
  createdDate?: string
  updatedDate?: string
  items: CartItem[]
  itemCount: number
  total: number
}
