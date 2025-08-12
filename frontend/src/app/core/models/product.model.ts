export interface Product {
  id: number
  name: string
  description?: string
  displayedPrice: number
  syncedStock?: number
  dynamicPrice?: number
  lastFetched?: string
  imageUrls: string[]
  categoryName?: string
  categoryId?: number
  supplierName?: string
  supplierId?: number
  externalProductId?: string
  active?: boolean
  status?: string
  supplierPrice?: number
  stockQuantity?: number
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: number
  name: string
  description: string
  active: boolean
}


export interface Category {
  id: number
  name: string
  description: string
  active: boolean
}
