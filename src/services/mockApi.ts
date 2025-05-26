import { User, Store, Rating, DashboardStats } from '@/types';

// Mock data
const mockUsers: User[] = [
{
  id: '1',
  name: 'System Administrator User',
  email: 'admin@platform.com',
  address: '123 Admin Street, Admin City, AC 12345',
  role: 'admin',
  password: 'Admin123!'
},
{
  id: '2',
  name: 'John Smith Regular Customer',
  email: 'john@email.com',
  address: '456 Customer Avenue, Customer City, CC 67890',
  role: 'user',
  password: 'User123!'
},
{
  id: '3',
  name: 'Store Owner Coffee Shop',
  email: 'owner@coffeeshop.com',
  address: '789 Business Boulevard, Business City, BC 54321',
  role: 'store_owner',
  password: 'Owner123!',
  storeId: '1'
},
{
  id: '4',
  name: 'Alice Johnson Regular User',
  email: 'alice@email.com',
  address: '321 Residential Road, Residential City, RC 98765',
  role: 'user',
  password: 'Alice123!'
}];


const mockStores: Store[] = [
{
  id: '1',
  name: 'Coffee Paradise Store',
  email: 'contact@coffeeparadise.com',
  address: '789 Business Boulevard, Business City, BC 54321',
  rating: 4.2,
  totalRatings: 15,
  ownerId: '3'
},
{
  id: '2',
  name: 'Electronics Superstore',
  email: 'info@electronicssuper.com',
  address: '555 Tech Avenue, Tech City, TC 11111',
  rating: 3.8,
  totalRatings: 22,
  ownerId: '5'
},
{
  id: '3',
  name: 'Fashion Boutique Center',
  email: 'hello@fashionboutique.com',
  address: '777 Style Street, Fashion District, FD 22222',
  rating: 4.5,
  totalRatings: 8,
  ownerId: '6'
}];


const mockRatings: Rating[] = [
{
  id: '1',
  userId: '2',
  storeId: '1',
  rating: 4,
  createdAt: '2024-01-15T10:30:00Z',
  userName: 'John Smith Regular Customer'
},
{
  id: '2',
  userId: '4',
  storeId: '1',
  rating: 5,
  createdAt: '2024-01-16T14:20:00Z',
  userName: 'Alice Johnson Regular User'
},
{
  id: '3',
  userId: '2',
  storeId: '2',
  rating: 3,
  createdAt: '2024-01-17T09:15:00Z',
  userName: 'John Smith Regular Customer'
}];


// API simulation functions
export const mockApi = {
  // Authentication
  login: async (email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  signup: async (userData: Omit<User, 'id' | 'role'> & {password: string;}): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers.find((u) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      role: 'user'
    };

    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      totalUsers: mockUsers.filter((u) => u.role !== 'admin').length,
      totalStores: mockStores.length,
      totalRatings: mockRatings.length
    };
  },

  // Users management
  getUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers.map(({ password: _, ...user }) => user);
  },

  createUser: async (userData: Omit<User, 'id'> & {password: string;}): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers.find((u) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    };

    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  updatePassword: async (userId: string, newPassword: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers[userIndex].password = newPassword;
  },

  // Stores management
  getStores: async (): Promise<Store[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStores;
  },

  createStore: async (storeData: Omit<Store, 'id' | 'rating' | 'totalRatings'>): Promise<Store> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newStore: Store = {
      ...storeData,
      id: Date.now().toString(),
      rating: 0,
      totalRatings: 0
    };

    mockStores.push(newStore);
    return newStore;
  },

  // Ratings management
  getRatings: async (): Promise<Rating[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockRatings;
  },

  getRatingsByStore: async (storeId: string): Promise<Rating[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockRatings.filter((r) => r.storeId === storeId);
  },

  getUserRatingForStore: async (userId: string, storeId: string): Promise<Rating | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockRatings.find((r) => r.userId === userId && r.storeId === storeId) || null;
  },

  submitRating: async (userId: string, storeId: string, rating: number): Promise<Rating> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');

    const store = mockStores.find((s) => s.id === storeId);
    if (!store) throw new Error('Store not found');

    // Check if user already rated this store
    const existingRatingIndex = mockRatings.findIndex((r) => r.userId === userId && r.storeId === storeId);

    const newRating: Rating = {
      id: Date.now().toString(),
      userId,
      storeId,
      rating,
      createdAt: new Date().toISOString(),
      userName: user.name
    };

    if (existingRatingIndex >= 0) {
      // Update existing rating
      mockRatings[existingRatingIndex] = newRating;
    } else {
      // Add new rating
      mockRatings.push(newRating);
      store.totalRatings++;
    }

    // Recalculate store rating
    const storeRatings = mockRatings.filter((r) => r.storeId === storeId);
    const averageRating = storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length;
    store.rating = Math.round(averageRating * 10) / 10;

    return newRating;
  }
};