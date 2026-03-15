import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { courseDb, seedCourses } from "@/lib/db";
import { Button } from "@/components/ui";
import { ArrowRight, Clock, BookOpen, ChevronRight, Zap } from "lucide-react";

export const metadata = {
  title: "Courses - UpSkill",
  description: "Browse our collection of soft skills courses designed to help you advance your career",
};

export default async function CoursesPage() {
  await seedCourses();
  const courses = await courseDb.findAll();

  const courseColors: Record<string, { bg: string; border: string; icon: string; gradient: string }> = {
    "Communication Basics": { bg: "bg-blue-50", border: "border-blue-200", icon: "💬", gradient: "from-blue-500 to-blue-600" },
    "Interview Skills": { bg: "bg-green-50", border: "border-green-200", icon: "🎯", gradient: "from-green-500 to-green-600" },
    "Workplace Etiquette": { bg: "bg-purple-50", border: "border-purple-200", icon: "🏢", gradient: "from-purple-500 to-purple-600" },
    "Time Management": { bg: "bg-amber-50", border: "border-amber-200", icon: "⏰", gradient: "from-amber-500 to-amber-600" },
    "Leadership Basics": { bg: "bg-rose-50", border: "border-rose-200", icon: "👔", gradient: "from-rose-500 to-rose-600" },
  };

  // Estimate lessons based on content length (rough calculation)
  const getLessonCount = (content: string) => {
    const sections = content.split(/^## /m).filter(Boolean);
    return Math.max(3, sections.length);
  };

  // Estimate duration based on content length
  const getDuration = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // ~200 words per minute reading
    return `${Math.max(15, minutes)} min`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/20 py-12 md:py-16">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 gradient-orb gradient-orb-primary opacity-30" />
        <div className="absolute bottom-0 left-0 w-48 h-48 gradient-orb gradient-orb-amber opacity-20" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 animate-fade-in-up">
              Your Learning Path
            </h1>
            <p className="text-lg text-slate-600 mb-6 animate-fade-in-up animate-stagger-1">
              Complete courses in order to build essential soft skills for career success.
            </p>
            <p className="text-slate-500 animate-fade-in-up animate-stagger-2">
              {courses.length} courses available
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid - Bento Style */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any, index: number) => {
              const colorScheme = courseColors[course.title] || {
                bg: "bg-slate-50",
                border: "border-slate-200",
                icon: "📚",
                gradient: "from-slate-500 to-slate-600"
              };
              const lessonCount = getLessonCount(course.content || "");
              const duration = getDuration(course.content || "");

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`
                    ${colorScheme.bg} border ${colorScheme.border} rounded-2xl p-6
                    hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300
                    h-full flex flex-col
                  `}>
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorScheme.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                        {colorScheme.icon}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-all duration-300 transform group-hover:scale-110">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-600 mb-3">
                        {course.category || "General"}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200/50">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <BookOpen className="w-4 h-4" />
                        {lessonCount} lessons
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-4 h-4" />
                        {duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-primary-600 ml-auto">
                        <Zap className="w-4 h-4" />
                        Start
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-4">
              Create an account to track your progress
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg">
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
