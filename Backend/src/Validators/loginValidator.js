import { email, z } from "zod/v4";

export const loginValidator = z
  .object({
    email: z.email("Enter a valid email").optional(),
    username: z.string().refine(
      (value) => value.length > 2,
      (value) => ({
        error: `${value} is to short it must contain atleast 3 charaters`,
        abort: true,
      })
    ).optional(),
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
  })
  .refine((data) => data.email || data.username, {
    message: "Either email or username is required",
    path: ["email"], // You can choose "username" here too
  });
