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

  // Calculation Result Modal
  calcModalVisible: boolean;
  setCalcModalVisible: (val: boolean) => void;

  // The final BAC result string (e.g., "0.056 g/L")
  calcResult: string | null;
  setCalcResult: (val: string | null) => void;

  // Liters
  liters: number;
  incrementLiters: (amount: number) => void;
  setLiters: (val: number) => void;

  // Modal states for editing liters
  litersModalVisible: boolean;
  setLitersModalVisible: (val: boolean) => void;
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

  // Calculation Result Modal
  calcModalVisible: false,
  setCalcModalVisible: (val) => set({ calcModalVisible: val }),

  calcResult: null,
  setCalcResult: (val) => set({ calcResult: val }),

  // Liters
  liters: 0, // Initial value
  incrementLiters: (amount) =>
    set((state) => ({ liters: state.liters + amount })),
  setLiters: (val) => set({ liters: val }),

  // Modal control
  litersModalVisible: false,
  setLitersModalVisible: (val) => set({ litersModalVisible: val }),
}));
