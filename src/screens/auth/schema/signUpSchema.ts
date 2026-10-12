import * as yup from "yup";

export interface SignUpFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  agreeToTerms: boolean;
  sendDiscounts?: boolean;
}

export const signUpSchema: yup.ObjectSchema<SignUpFormData> = yup
  .object({
    fullName: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters"),

    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Enter a valid email address"),

    mobileNumber: yup
      .string()
      .trim()
      .required("Mobile number is required")
      .matches(
        /^[0-9]{10,12}$/,
        "Mobile number must be 10 to 12 digits"
      ),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    agreeToTerms: yup
      .boolean()
      .required("You must agree to the Terms of Service & Privacy Policy")
      .oneOf([true], "You must agree to the Terms of Service & Privacy Policy"),

    sendDiscounts: yup.boolean().optional(),
  })
  .required();
