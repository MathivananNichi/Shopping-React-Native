import { z } from "zod";

/**
 * Generic API Response Zod Schema
 */
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema,
  });

export const apiResponseSchema = createApiResponseSchema;

/**
 * Inferred generic ApiResponse derived directly from Zod Schema
 */
export type ApiResponse<T> = z.infer<
  ReturnType<typeof createApiResponseSchema<z.ZodType<T>>>
>;