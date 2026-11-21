"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ButtonLink } from "./ui/Button";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-site flex h-16 items-center justify-between">
        {/* Logo & Branding - Blackroid Style */}
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          {/* Blackroid Logo - Professional Black Style */}
          <span className="text-lg font-black text-gray-900">blackroid</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {!session && (
            <>
              <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">Home</Link>
              <ButtonLink href="/auth/signin" className="border border-gray-300 text-gray-900 hover:bg-gray-50">
                Sign In
              </ButtonLink>
              <ButtonLink href="/auth/signup" className="bg-gray-900 text-white hover:bg-black">
                Sign Up
              </ButtonLink>
            </>
          )}
          {session && (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Sign Out
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
