import { createIngredient, deleteIngredient, getIngredients } from "@/actions/ingredient";
import type { IIngredient } from "@/types/ingredint";
import { create } from "zustand";

interface IngredientState {
  ingredients: IIngredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getIngredients();
      console.log("Fetched ingredients:", result);
      if (result.success) {
        set({ ingredients: result.ingredients, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.error("Error loading ingredients:", error);
      set({ error: "Failed to load ingredients", isLoading: false });
    }
  },
  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createIngredient(formData);
      if (result.success) {
          set((state) => ({
            ingredients: [...state.ingredients, result.ingredient],
            isLoading: false
          }));
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
      set({ error: "Failed to add ingredient", isLoading: false });
    }
  },
  removeIngredient: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await deleteIngredient(id);
      if (result.success) {
        set((state) => ({
            ingredients: state.ingredients.filter(ingredient => ingredient.id !== id),
            isLoading: false
        }));
        }
    } catch (error) {
            console.error("Error deleting ingredient:", error);
            set({ error: "Failed to delete ingredient", isLoading: false });
        }
    }
}));
