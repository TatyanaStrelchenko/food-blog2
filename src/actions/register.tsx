"use server"

import type { IFormData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

export async function registerUser(formData: IFormData) {
    if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
    }
    if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    try {

        const existingUser = await prisma.user.findUnique({
            where: {
                email: formData.email
            }
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const pwHash = await saltAndHashPassword(formData.password)
        const user = await prisma.user.create({
            data: {
                email: formData.email,
                password: pwHash,
            },
        });
        console.log({user});
        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Registration failed");
    }
}