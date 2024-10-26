import { z } from "zod";

export const createSupplierSchema = z.object({
    name: z.string().min(3).max(255),
    contactInformation: z.string(),
    address: z.string()
})

export const createCategorySchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string()
})

export const createOrderSchema = z.object({
    orderDate: z.date(),
    totalAmount: z.number(),
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
})

export const createProductSchema = z.object({
    categoryId: z.string().uuid(),
    supplierId: z.string().uuid(),
    name: z.string().min(3).max(255),
    description: z.string(),
    price: z.number(),
}) 

export const createInventorySchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number(),
})