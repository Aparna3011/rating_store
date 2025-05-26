export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store_owner';
  password?: string;
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  rating: number;
  totalRatings: number;
  ownerId: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: string;
  userName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'role'> & {password: string;}) => Promise<void>;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}