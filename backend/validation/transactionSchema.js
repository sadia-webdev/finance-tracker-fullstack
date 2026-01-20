import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),

  amount: z
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .nonnegative("Amount cannot be negative"),

  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be income or expense" }),
  }),

  category: z.string().min(1, "Category is required"),

  date: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()),
      "Invalid date format"
    ),
});
