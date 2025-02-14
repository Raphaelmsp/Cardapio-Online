import { create } from 'zustand';

interface BusinessHoursStore {
  openingTime: string;
  closingTime: string;
  isOpen: () => boolean;
  setHours: (opening: string, closing: string) => void;
}

export const useBusinessHoursStore = create<BusinessHoursStore>((set, get) => ({
  openingTime: '07:00',
  closingTime: '23:00',
  
  isOpen: () => {
    const now = new Date();
    const currentDay = now.getDay();
    
    // Check if it's Sunday (0)
    if (currentDay === 0) return false;
    
    const [openHour, openMinute] = get().openingTime.split(':').map(Number);
    const [closeHour, closeMinute] = get().closingTime.split(':').map(Number);
    
    const opening = new Date();
    opening.setHours(openHour, openMinute, 0);
    
    const closing = new Date();
    closing.setHours(closeHour, closeMinute, 0);
    
    return now >= opening && now <= closing;
  },
  
  setHours: (opening: string, closing: string) => {
    set({ openingTime: opening, closingTime: closing });
  },
}));