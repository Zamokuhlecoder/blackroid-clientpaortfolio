"use server";

import { prisma } from "@/lib/prisma";
import { signIn as signInAuth } from "@/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signUp(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validated = signUpSchema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        password: hashedPassword,
      },
    });

    // Create portfolio for user
    await prisma.portfolio.create({
      data: {
        userId: user.id,
      },
    });

    // Sign in the user
    await signInAuth("credentials", {
      email: validated.email,
      password: validated.password,
      redirect: true,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "An error occurred during sign up" };
  }
}

export async function signInUser(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    signInSchema.parse(data);

    await signInAuth("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Invalid credentials" };
  }
}
