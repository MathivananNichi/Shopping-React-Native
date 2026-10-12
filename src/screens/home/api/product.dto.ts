import { z } from "zod";

/**
 * ============================================================================
 * PRODUCT ZOD MODELS & DTOs
 * ============================================================================
 */

export const productCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().optional(),
});
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productBrandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  isActive: z.boolean().optional(),
});
export type ProductBrand = z.infer<typeof productBrandSchema>;

export const productMaterialSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
export type ProductMaterial = z.infer<typeof productMaterialSchema>;

export const productVariantSchema = z.object({
  _id: z.string(),
  productId: z.string().optional(),
  colorId: z.string().optional(),
  sizeId: z.string().optional(),
  sku: z.string().optional(),
  discountPercentage: z.number().default(0),
  stock: z.number().default(0),
  lowStockThreshold: z.number().optional(),
  images: z.array(z.string()).default([]),
  actualPrice: z.number(),
  effectivePrice: z.number(),
  isActive: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type ProductVariant = z.infer<typeof productVariantSchema>;

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  categoryId: z.union([productCategorySchema, z.string()]),
  brandId: z.union([productBrandSchema, z.string()]),
  materialId: z.union([productMaterialSchema, z.string()]).optional(),
  userId: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  variants: z.array(productVariantSchema).default([]),
  minVariantPrice: z.number().optional(),
  maxVariantPrice: z.number().optional(),
});
export type Product = z.infer<typeof productSchema>;

export const productPaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});
export type ProductPagination = z.infer<typeof productPaginationSchema>;

export const productsDataSchema = z.object({
  products: z.array(productSchema),
  pagination: productPaginationSchema.optional(),
});
export type ProductsData = z.infer<typeof productsDataSchema>;

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}
