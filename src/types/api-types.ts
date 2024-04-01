import { CartItem, Order, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
  newUser: User;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};

export type AllCategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type ProductResponse = {
  success: boolean;
  singleProduct: Product;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminId: string;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};
