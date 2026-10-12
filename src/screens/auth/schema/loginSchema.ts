import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),

    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 8 characters"),
  })
  .required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
