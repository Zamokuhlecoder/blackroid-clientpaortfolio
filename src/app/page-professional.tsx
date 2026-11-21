"use client";

import Link from "next/link";
import { ArrowRight, Shield, Database, Zap, Eye } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

export default function ProfessionalHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Blackroid Style */}
      <div className="bg-white pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container-site">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900 mb-6">
              Project Progress<br />Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A professional platform for tracking your projects in real-time. Secure, transparent, and built for client success. Powered by Blackroid.
            </p>
            <div className="flex gap-4 flex-wrap">
              <ButtonLink href="/auth/signup" className="bg-gray-900 text-white hover:bg-black">
                Get Started <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/auth/signin" className="border border-gray-300 text-gray-900 hover:bg-gray-50">
                Sign In
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 lg:py-32">
        <div className="container-site">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Built for Transparency
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Everything you need to stay informed about your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all">
              <Eye className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Monitor your project progress with live updates. See milestones achieved and timelines in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all">
              <Shield className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption and security protocols.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all">
              <Database className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Organized Information</h3>
              <p className="text-gray-600">
                All project details organized and accessible. Project status, timeline, and updates in one place.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all">
              <Zap className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Always Available</h3>
              <p className="text-gray-600">
                Access your project information anytime, anywhere. Modern platform, responsive design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Simple & Straightforward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Getting started takes less than a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-semibold mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account with your email and password.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-semibold mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Log In</h3>
              <p className="text-gray-600">Access your personal project dashboard anytime.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-semibold mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">View your project details and monitor progress updates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-24 lg:py-32">
        <div className="container-site text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up now to access your project dashboard and start tracking progress.
          </p>
          <ButtonLink
            href="/auth/signup"
            className="bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center gap-2 font-medium"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container-site">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2026 Blackroid. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-gray-900">Privacy</Link>
              <Link href="#" className="hover:text-gray-900">Terms</Link>
              <Link href={`mailto:${site.publicEmail}`} className="hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
