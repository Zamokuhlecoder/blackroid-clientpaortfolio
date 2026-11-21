"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  progress: number;
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, projectsRes] = await Promise.all([
          fetch("/api/auth/session"),
          fetch("/api/projects"),
        ]);

        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setUser(session?.user);
        }

        if (projectsRes.ok) {
          const data = await projectsRes.json();
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace("-", " ").charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-site py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Track your project progress and updates</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-site py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h2>
            <p className="text-gray-600">
              Projects you're working on will appear here. Check back soon for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(project.status)}
                        <h3 className="text-xl font-semibold text-gray-900">
                          {project.title}
                        </h3>
                      </div>
                      {project.description && (
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      )}
                    </div>
                    <span className="ml-4 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                      {getStatusLabel(project.status)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600 font-medium">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {project.startDate && (
                      <div>
                        <p className="text-gray-600 text-xs uppercase tracking-wide font-medium mb-1">
                          Start Date
                        </p>
                        <p className="text-gray-900 font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(project.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {project.targetDate && (
                      <div>
                        <p className="text-gray-600 text-xs uppercase tracking-wide font-medium mb-1">
                          Target Date
                        </p>
                        <p className="text-gray-900 font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(project.targetDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {project.completedDate && (
                      <div>
                        <p className="text-gray-600 text-xs uppercase tracking-wide font-medium mb-1">
                          Completed Date
                        </p>
                        <p className="text-gray-900 font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {new Date(project.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
