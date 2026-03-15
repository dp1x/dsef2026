"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Mascot } from "@/components/ui";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`font-medium transition-all duration-200 ${
        isActive
          ? "text-primary-600"
          : "text-slate-600 hover:text-primary-600"
      }`}
    >
      {children}
    </Link>
  );
}

interface NavigationProps {
  showAuth?: boolean;
}

export function Navigation({ showAuth = true }: NavigationProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg shadow-slate-200/50"
          : "bg-white/70 backdrop-blur-md"
      } border-b border-slate-200/50`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
{/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Mascot size="md" mood="idle" showBackground={true} />
          <span className="text-xl font-display font-extrabold text-slate-900">UpSkill</span>
        </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/courses" isActive={isActive("/courses")}>
              Courses
            </NavLink>
            <NavLink href="/about" isActive={isActive("/about")}>
              About
            </NavLink>
          </div>

          {/* Desktop Auth Buttons */}
          {showAuth && (
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {session.user?.name || "Dashboard"}
                  </Link>
                  <Link href="/api/auth/signout" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link
                href="/courses"
                className={`font-medium py-2 ${
                  isActive("/courses") ? "text-primary-600" : "text-slate-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/about"
                className={`font-medium py-2 ${
                  isActive("/about") ? "text-primary-600" : "text-slate-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {showAuth && (
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-center text-slate-600 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="text-center text-slate-600 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Out
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-center text-slate-600 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="primary" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;