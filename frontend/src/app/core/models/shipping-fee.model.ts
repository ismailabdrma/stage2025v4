export interface ShippingFee {
  id?: number;
  countryCode: string;
  countryName: string;
  region?: string;
  city?: string;
  postalCodeFrom?: string;
  postalCodeTo?: string;
  baseFee: number;
  currency: string;
  minOrderAmount?: number;
  freeShippingThreshold?: number;
  deliveryTime?: string;
  active: boolean;
  priority?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShippingFeeRequest {
  cityCode: string;
  cityName: string;
  country: string;
  state?: string;
  fee: number;
  currency?: string;
  active?: boolean;
  minOrderAmount?: number;
  maxOrderAmount?: number;
  deliveryTime?: string;
  weightLimit?: number;
}

export interface UpdateShippingFeeRequest extends CreateShippingFeeRequest {
  id: number;
}

export interface ShippingFeeZone {
  id?: number;
  name: string;
  description?: string;
  countries: string[];
  baseFee: number;
  currency: string;
  active: boolean;
  rules: ShippingFeeRule[];
}

export interface ShippingFeeRule {
  id?: number;
  minOrderAmount: number;
  maxOrderAmount?: number;
  fee: number;
  type: 'FIXED' | 'PERCENTAGE' | 'FREE_SHIPPING';
  priority: number;
}
