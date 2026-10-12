import { z } from "zod";

/**
 * ============================================================================
 * LOGIN REQUEST & RESPONSE MODELS (ZOD)
 * ============================================================================
 */

// Login Request Zod Schema
export const loginRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof loginRequestSchema>;
export type LoginRequest = LoginDto;

// Login Response Zod Schema
export const loginResponseSchema = z.object({
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

/**
 * ============================================================================
 * SIGN UP REQUEST & RESPONSE MODELS (ZOD)
 * ============================================================================
 */

// Sign Up Request Zod Schema
export const signUpRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10,12}$/, "Mobile number must be 10 to 12 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type SignUpDto = z.infer<typeof signUpRequestSchema>;
export type SignUpRequest = SignUpDto;

// Sign Up Response Zod Schema
export const signUpResponseSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  fullName: z.string().optional(),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;