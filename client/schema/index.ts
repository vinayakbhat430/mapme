import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email!"
  }),
  name: z.string().min(1, {
    message: "Please enter your name."
  }),
  password: z.string()
    .min(6, {
      message: "Password must be at least 6 characters long"
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(/[\d]/, {
      message: "Password must contain at least one number"
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character @$!%*?&"
    }),
  confirmPassword: z.string()
    .min(6, {
      message: "Confirm password must be at least 6 characters long"
    })
    .regex(/[a-z]/, {
      message: "Confirm password must contain at least one lowercase letter"
    })
    .regex(/[A-Z]/, {
      message: "Confirm password must contain at least one uppercase letter"
    })
    .regex(/[\d]/, {
      message: "Confirm password must contain at least one number"
    })
    .regex(/[@$!%*?&]/, {
      message: "Confirm password must contain at least one special character @$!%*?&"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email!"
    }),
    password: z.string()
    .min(6, {
      message: "Password must be at least 6 characters long"
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(/[\d]/, {
      message: "Password must contain at least one number"
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character @$!%*?&"
    }),
})
