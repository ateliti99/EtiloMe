// store/appStore.ts
import { create } from 'zustand';

interface Drink {
  quantity: string;
  percentage: string;
  time: string;
}

interface AppState {
  // Gender
  selectedGender: string | null;
  setSelectedGender: (gender: string | null) => void;

  // Age, Weight, and Empty Stomach
  age: string;
  setAge: (age: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  emptyStomach: boolean | null;
  setEmptyStomach: (val: boolean | null) => void;

  // Drinks array
  drinks: Drink[];
  addDrink: (quantity: string, percentage: string, time: string) => void;
  removeDrink: (index: number) => void;

  // Modal state + new drink fields
  isModalVisible: boolean;
  setModalVisible: (val: boolean) => void;

  newDrinkQuantity: string;
  setNewDrinkQuantity: (val: string) => void;
  newAlcoholPercentage: string;
  setNewAlcoholPercentage: (val: string) => void;
  newTimeAgo: string;
  setNewTimeAgo: (val: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Gender
  selectedGender: null,
  setSelectedGender: (gender) => set({ selectedGender: gender }),

  // Age, Weight, Stomach
  age: '',
  setAge: (age) => set({ age }),
  weight: '',
  setWeight: (weight) => set({ weight }),
  emptyStomach: null,
  setEmptyStomach: (val) => set({ emptyStomach: val }),

  // Drinks
  drinks: [],
  addDrink: (quantity, percentage, time) =>
    set((state) => ({
      drinks: [...state.drinks, { quantity, percentage, time }],
    })),
  removeDrink: (index) =>
    set((state) => ({
      drinks: state.drinks.filter((_, i) => i !== index),
    })),

  // Modal + new drink fields
  isModalVisible: false,
  setModalVisible: (val) => set({ isModalVisible: val }),

  newDrinkQuantity: '',
  setNewDrinkQuantity: (val) => set({ newDrinkQuantity: val }),
  newAlcoholPercentage: '',
  setNewAlcoholPercentage: (val) => set({ newAlcoholPercentage: val }),
  newTimeAgo: '',
  setNewTimeAgo: (val) => set({ newTimeAgo: val }),
}));
