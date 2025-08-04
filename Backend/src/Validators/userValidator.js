import { z } from "zod/v4";

export const userValidatorSchema = z.object({
  name: z.string().min(2, "Name should contains more than 2 characters"),
  username: z.string().min(2, "Name should contains more than 2 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    }),
  phonenumber: z
    .string()
    .regex(/^[+]?[0-9]{10,15}$/, "Enter a valid phone number"),
  avatar: z.url().optional(),
  coverImage: z.url().optional(),
  emailId: z.email("Enter the correct Email Address"),
  refreshToken: z.string().optional(),
});
