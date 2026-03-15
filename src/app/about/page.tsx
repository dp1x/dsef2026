import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { GraduationCap, Target, Heart, Zap, Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata = {
  title: "About Us - UpSkill",
  description: "Learn about UpSkill's mission to empower workers through AI-powered soft skills education",
};

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Active Learners" },
    { icon: BookOpen, value: "15+", label: "Courses" },
    { icon: TrendingUp, value: "85%", label: "Career Improvement" },
    { icon: Award, value: "4.8", label: "Average Rating" },
  ];

  const values = [
    {
      icon: Target,
      title: "Accessibility",
      description: "We believe quality education should be accessible to everyone, regardless of location or background.",
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Every decision we make is guided by what's best for our learners and their career growth.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to provide personalized, effective learning experiences.",
    },
    {
      icon: GraduationCap,
      title: "Excellence",
      description: "We're committed to delivering the highest quality content and support to help you succeed.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 animate-fade-in">
              Empowering Workers Through{" "}
              <span className="text-gradient">Education</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 animate-slide-up">
              UpSkill is on a mission to transform careers by providing accessible, 
              AI-powered soft skills training for workers in developing economies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/courses">
                <Button variant="primary" size="lg">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  UpSkill was founded with a simple belief: soft skills are the key to 
                  career advancement, yet they're often overlooked in traditional education.
                </p>
                <p>
                  We saw millions of workers in developing economies who had the talent 
                  and drive to succeed, but lacked access to training in communication, 
                  leadership, and other essential skills.
                </p>
                <p>
                  By combining AI technology with proven pedagogical methods, we've created 
                  a platform that delivers personalized, affordable training at scale. Our 
                  AI tutor provides instant feedback and support, making quality education 
                  accessible 24/7.
                </p>
                <p>
                  Today, we're proud to have helped thousands of learners around the world 
                  build the skills they need to advance their careers and achieve their goals.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-amber-100 rounded-3xl" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-card flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="w-12 h-12 text-primary-500" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">
                      "Education is the most powerful weapon which you can use to change the world."
                    </p>
                    <p className="text-sm text-slate-500 mt-2">— Nelson Mandela</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These core values guide everything we do at UpSkill
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of learners who are building the skills they need to succeed in their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50"
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-primary-700 text-white border-primary-600 hover:bg-primary-800"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}