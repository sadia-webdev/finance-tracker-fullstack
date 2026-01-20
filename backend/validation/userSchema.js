import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be valid"
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
  //   "Password must contain uppercase, lowercase, number, and special character"
  // ),

  role: z.enum(["user", "admin"]).optional(),
});
