const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const mainWebsite = process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL || "https://blackroid.com";

export const site = {
  name: "Blackroid Client Portfolio",
  legalName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Blackroid",
  tagline: "Track your project progress in real-time.",
  description:
    "A secure, professional client portal where you can track the progress of your projects, view milestones, and stay updated with your team.",
  url: siteUrl,
  locale: "en",
  country: "",
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@blackroid.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "",
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/blackroid",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/blackroid",
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/blackroid",
  },
  clientPortalUrl: siteUrl,
  mainWebsite,
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Sign In", href: "/auth/signin" },
  { label: "Dashboard", href: "/dashboard" },
] as const;

/** Builds a remote Unsplash URL (images are free-licence, served via next/image). */
export function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`;
}
