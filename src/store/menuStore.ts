import { create } from 'zustand';
import { addOptionalDish, getMainDishes, getOptionalDishes, addOrder, getOrders, updateMainDish, updateOptionalDish } from '../lib/db';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dayOfWeek: string;
}

interface Order {
  id?: number;
  items: MenuItem[];
  name: string;
  registration: string;
  observations: string;
  date: Date;
}

interface MenuStore {
  mainDishes: MenuItem[];
  optionalDishes: MenuItem[];
  orders: Order[];
  loadMainDishes: () => Promise<void>;
  loadOptionalDishes: () => Promise<void>;
  loadOrders: () => Promise<void>;
  addOptionalDish: (item: MenuItem) => Promise<void>;
  updateOptionalDish: (id: number, item: MenuItem) => Promise<void>;
  updateMainDish: (id: number, item: MenuItem) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
}

export const useMenuStore = create<MenuStore>((set) => ({
  mainDishes: [],
  optionalDishes: [],
  orders: [],
  loadMainDishes: async () => {
    const mainDishes = await getMainDishes();
    set({ mainDishes });
  },
  loadOptionalDishes: async () => {
    const optionalDishes = await getOptionalDishes();
    set({ optionalDishes });
  },
  loadOrders: async () => {
    const orders = await getOrders();
    set({ orders });
  },
  addOptionalDish: async (item) => {
    await addOptionalDish(item);
    const optionalDishes = await getOptionalDishes();
    set({ optionalDishes });
  },
  updateOptionalDish: async (id, item) => {
    await updateOptionalDish(id, item);
    const optionalDishes = await getOptionalDishes();
    set({ optionalDishes });
  },
  updateMainDish: async (id, item) => {
    await updateMainDish(id, item);
    const mainDishes = await getMainDishes();
    set({ mainDishes });
  },
  addOrder: async (order) => {
    await addOrder(order);
    const orders = await getOrders();
    set({ orders });
  },
}));