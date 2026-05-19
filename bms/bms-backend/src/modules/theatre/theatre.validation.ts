import { z } from "zod";

export const TheatreSchema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string().min(1, "Location is required"),
    logo: z.string().url("Logo is required and must be a valid URL"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required")
})

export type TheatreInput = z.infer<typeof TheatreSchema>;