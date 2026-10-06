export type FoodCategory = 'veg' | 'non-veg' | 'tandoori';

export type SubCategory = 
  | 'all'
  | 'starters'
  | 'curries'
  | 'rice-biryani'
  | 'breads'
  | 'desserts'
  | 'platters';

export interface MenuItem {
  id: string;
  name: string;
  regionalName?: string;
  description: string;
  price: number;
  category: FoodCategory;
  subCategory: SubCategory;
  isVeg: boolean;
  spicyLevel: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Fiery
  image: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  serves?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  portionNotes?: string;
}

export interface TableReservation {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: 'Indoor AC Family Hall' | 'Open Garden Lawn' | 'Rooftop Lounge' | 'No Preference';
  specialOccasion?: 'None' | 'Birthday' | 'Anniversary' | 'Family Get-together' | 'Business Lunch';
  notes?: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface FoodOrder {
  id: string;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  customerName: string;
  phone: string;
  deliveryAddress?: string;
  landmark?: string;
  pickupTime?: string;
  notes?: string;
  paymentMethod: 'Cash / UPI on Delivery' | 'Pay at Counter (Takeaway)' | 'Online UPI';
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  taxes: number;
  discount: number;
  totalAmount: number;
  status: 'Received' | 'Preparing' | 'Out for Delivery' | 'Ready for Pickup';
  createdAt: string;
}

export type PageSection = 'home' | 'about' | 'menu' | 'order-booking' | 'contact';
