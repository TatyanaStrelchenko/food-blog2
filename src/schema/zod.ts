import { object, string, number } from "zod";
import { z } from "zod";

export const signInSchema = object({
  email: string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
});

export const ingredientSchema = object({
  name: string().min(1, "Название обязательно"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "DAIRY",
    "GRAINS",
    "PROTEIN"
  ]),
  unit: z.enum(["KILOGRAMS", "GRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  pricePerUnit: number()
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: z.string().optional()
});
