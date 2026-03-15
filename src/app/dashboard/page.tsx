import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { courseDb, progressDb, seedCourses } from "@/lib/db";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { Button, Card, ProgressBar } from "@/components/ui";
import { GraduationCap, ArrowRight, BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const userId = (user as any).id;

  await seedCourses();

  const courses = await courseDb.findAll();
  const progress = await progressDb.findByUser(userId);

  const completedCount = progress.filter((p: any) => p.completed).length;
  const inProgressCount = progress.filter((p: any) => p.progress_percent > 0 && !p.completed).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.name || "Learner"}!
          </h1>
          <p className="text-slate-600">
            Continue your learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
              <p className="text-sm text-slate-500">Total Courses</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
              <p className="text-sm text-slate-500">Completed</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inProgressCount}</p>
              <p className="text-sm text-slate-500">In Progress</p>
            </div>
          </Card>
        </div>

        {/* Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Your Courses</h2>
            <Link href="/courses" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid gap-4">
            {courses.map((course: any) => {
              const userProgress = progress.find((p: any) => p.course_id === course.id);
              const progressPercent = userProgress?.progress_percent || 0;

              return (
                <Link key={course.id} href={`/courses/${course.id}`} className="block group">
                  <Card className="hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                          📚
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {course.title}
                          </h3>
                          <p className="text-sm text-slate-500 truncate">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-4">
                        <div className="w-32">
                          <ProgressBar value={progressPercent} size="sm" />
                          <p className="text-xs text-slate-400 text-right mt-1">
                            {progressPercent}% complete
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
