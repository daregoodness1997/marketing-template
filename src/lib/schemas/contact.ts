import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "validation_name_min")
    .max(100, "validation_name_max"),
  email: z
    .string()
    .trim()
    .min(1, "validation_email_required")
    .email("validation_email_invalid"),
  company: z
    .string()
    .trim()
    .max(100, "validation_company_max")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(30, "validation_phone_max")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "validation_message_min")
    .max(2000, "validation_message_max"),
  /** Honeypot field — must be empty. */
  _hp: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
