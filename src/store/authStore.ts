import { create } from 'zustand';
import { verifyAdmin } from '../lib/db';

interface AuthStore {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    const isValid = await verifyAdmin(username, password);
    set({ isAuthenticated: isValid });
    return isValid;
  },
  logout: () => set({ isAuthenticated: false }),
}));