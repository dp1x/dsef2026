"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GraduationCap, ArrowLeft, CheckCircle, Loader2, Clock, BookOpen, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { sanitizeText } from "@/lib/sanitize";
import { Button } from "@/components/ui";

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  duration?: string;
  lessonCount?: number;
}

// Define types for content parsing
interface ContentBlock {
  type: 'paragraph' | 'subheading' | 'list' | 'ordered-list';
  content: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CourseSection {
  id: string;
  title: string;
  contentBlocks: ContentBlock[];
  quiz?: QuizQuestion[]; // Optional quiz for the section
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // Track current section for progress
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({}); // Track quiz answers
  const [showQuizResults, setShowQuizResults] = useState(false); // Show quiz results
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const courses = await response.json();
        const found = courses.find((c: Course) => c.id === courseId);
        if (found) {
          setCourse(found);
          setIsComplete(found.completed || false);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!session) {
      alert("Please sign in to track your progress");
      return;
    }

    setMarkingComplete(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          completed: true,
          progressPercent: 100,
        }),
      });

      if (response.ok) {
        setIsComplete(true);
      } else {
        throw new Error("Failed to update progress");
      }
    } catch (err) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">{error || "Course not found"}</p>
          <Link href="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Parse content into structured sections
  const parseContent = (): CourseSection[] => {
    const sections = course.content.split(/^## /m).filter(Boolean);
    return sections.map((section: string, index: number) => {
      const lines = section.split('\\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\\n');
      
      // Parse content into paragraphs, lists, and subheadings
      const contentBlocks: ContentBlock[] = [];
      let currentBlock: string[] = [];
      let currentType: 'paragraph' | 'subheading' | 'list' | 'ordered-list' = 'paragraph';
      
      content.split('\\n').forEach((line: string) => {
        line = line.trim();
        if (!line) return;
        
        if (line.startsWith('### ')) {
          // Save previous block if exists
          if (currentBlock.length > 0) {
            contentBlocks.push({ type: currentType, content: currentBlock.join('\\n') });
          }
          // Start new subheading block
          contentBlocks.push({ type: 'subheading', content: line.replace('### ', '') });
          currentType = 'paragraph';
          currentBlock = [];
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          // Handle list items
          if (currentType !== 'list') {
            if (currentBlock.length > 0) {
              contentBlocks.push({ type: currentType, content: currentBlock.join('\\n') });
            }
            currentType = 'list';
            currentBlock = [line];
          } else {
            currentBlock.push(line);
          }
        } else if (/^\d+\.\s/.test(line)) {
          // Handle numbered lists
          if (currentType !== 'ordered-list') {
            if (currentBlock.length > 0) {
              contentBlocks.push({ type: currentType, content: currentBlock.join('\\n') });
            }
            currentType = 'ordered-list';
            currentBlock = [line];
          } else {
            currentBlock.push(line);
          }
        } else {
          // Regular paragraph
          if (currentType !== 'paragraph') {
            if (currentBlock.length > 0) {
              contentBlocks.push({ type: currentType, content: currentBlock.join('\\n') });
            }
            currentType = 'paragraph';
            currentBlock = [line];
          } else {
            currentBlock.push(line);
          }
        }
      });
      
      // Add the last block
      if (currentBlock.length > 0) {
        contentBlocks.push({ type: currentType, content: currentBlock.join('\\n') });
      }
      
      return {
        id: index === 0 ? 'intro' : `section-${index}`,
        title,
        contentBlocks
      };
    });
  };
  
  const sections = parseContent();
  
  // Scroll to current section when it changes
  useEffect(() => {
    // On mobile, we show all sections, but on desktop we only show current
    // So we need to scroll to the top of the content area when section changes
    if (window.innerWidth >= 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSection]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-button">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">UpSkill</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/courses" className="text-slate-600 hover:text-slate-900 font-medium">
              Courses
            </Link>
            {session ? (
              <Link href="/dashboard" className="text-primary-600 font-medium">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/courses" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
              {sanitizeText(course.category || "General")}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              {course.duration || "~30 min"}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <BookOpen className="w-4 h-4" />
              {course.lessonCount ? `${course.lessonCount} lessons` : "5 lessons"}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {sanitizeText(course.title)}
          </h1>
          <p className="text-slate-600 text-lg">
            {sanitizeText(course.description)}
          </p>
        </div>

         {/* Course Content */}
         <div className="flex flex-col md:flex-row gap-8">
           {/* Section Navigation Sidebar */}
           <div className="md:w-64 flex-shrink-0 hidden md:block">
             <div className="bg-slate-50 rounded-xl p-4 sticky top-24">
               <h3 className="font-semibold text-slate-800 mb-3">Course Sections</h3>
               <ul className="space-y-2">
                 {sections.map((section, index) => (
                   <li key={section.id}>
                     <button
                       onClick={() => setCurrentSection(index)}
                       className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                         currentSection === index
                           ? 'bg-primary-100 text-primary-700 font-medium'
                           : 'text-slate-600 hover:bg-slate-100'
                       }`}
                     >
                       <span className="mr-2">{index + 1}.</span>
                       {section.title.length > 30 ? `${section.title.substring(0, 30)}...` : section.title}
                     </button>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
           
           {/* Main Content */}
           <div className="flex-1">
             <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <div className="space-y-8">
                {sections.map((section, index) => (
              <div 
            key={section.id} 
            className={`pb-8 border-b border-slate-100 last:border-b-0 last:pb-0 ${currentSection === index ? 'block' : 'hidden md:block'}`}
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                    </span>
                  {section.title}
                </h2>
                
                <div className="space-y-4 ml-10">
              {section.contentBlocks.map((block, blockIndex) => {
                if (block.type === 'subheading') {
                      return (
                        <h3 key={blockIndex} className="text-lg font-semibold text-slate-800 mt-6 mb-3 pl-4 border-l-2 border-primary-200 pl-4">
                            {block.content}
                            </h3>
                          );
                        } else if (block.type === 'list') {
                          return (
                            <ul key={blockIndex} className="list-disc list-inside text-slate-600 space-y-2 pl-4">
                              {block.content.split('\\n').map((item, itemIndex) => {
                                const cleanedItem = item.replace(/^-\s*|\*-\s*/,'');
                                 return cleanedItem.trim() ? <li key={itemIndex}>{cleanedItem}</li> : null;
                               }).filter(Boolean)}
                             </ul>
                           );
                         } else if (block.type === 'ordered-list') {
                           return (
                             <ol key={blockIndex} className="list-decimal list-inside text-slate-600 space-y-2 pl-4">
                               {block.content.split('\\n').map((item, itemIndex) => {
                                 const cleanedItem = item.replace(/^\d+\.\s*/,'');
                                 return cleanedItem.trim() ? <li key={itemIndex}>{cleanedItem}</li> : null;
                               }).filter(Boolean)}
                             </ol>
                           );
                         } else {
                           return (
                             <p key={blockIndex} className="text-slate-600 leading-relaxed">
                               {block.content.split('\\n').map((line, lineIndex) => (
                                 <span key={lineIndex}>
                                   {line}
                                   {lineIndex < block.content.split('\\n').length - 1 && <br />}
                                 </span>
                               ))}
                             </p>
                           );
                         }
                       })}
                     </div>
                     
                     {/* Section Quiz if available */}
                     {section.quiz && section.quiz.length > 0 && (
                       <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 rounded-xl p-4">
                         <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                           <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold">
                             ?
                           </span>
                           Knowledge Check
                         </h3>
                         
                         {section.quiz.map((question, qIndex) => {
                           const questionKey = `${section.id}-${qIndex}`;
                           const userAnswer = quizAnswers[questionKey];
                           
                           return (
                             <div key={question.id} className="mb-6 last:mb-0">
                               <p className="font-medium text-slate-700 mb-3">{qIndex + 1}. {question.question}</p>
                               
                               <div className="space-y-2 ml-2">
                                 {question.options.map((option, oIndex) => (
                                   <label 
                                     key={oIndex}
                                     className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                                       userAnswer === oIndex 
                                         ? (oIndex === question.correctAnswer 
                                           ? 'bg-green-100 border border-green-300' 
                                           : 'bg-red-100 border border-red-300')
                                         : 'bg-white border border-slate-200 hover:bg-slate-50'
                                     }`}
                                   >
                                     <input
                                       type="radio"
                                       name={questionKey}
                                       checked={userAnswer === oIndex}
                                       onChange={() => setQuizAnswers(prev => ({ ...prev, [questionKey]: oIndex }))}
                                       className="text-primary-500 focus:ring-primary-500"
                                     />
                                     <span className="text-slate-700">{option}</span>
                                   </label>
                                 ))}
                               </div>
                               
                               {userAnswer !== undefined && (
                                 <div className={`mt-2 text-sm p-3 rounded-lg ${
                                   userAnswer === question.correctAnswer 
                                     ? 'bg-green-50 text-green-700' 
                                     : 'bg-red-50 text-red-700'
                                 }`}>
                                   {userAnswer === question.correctAnswer 
                                     ? '✓ Correct! Well done.' 
                                     : `✗ Incorrect. ${question.explanation}`}
                                 </div>
                               )}
                             </div>
                           );
                         })}
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>

         {/* Progress Tracker */}
         <div className="mt-8 pt-6 border-t border-slate-200">
           <div className="flex items-center justify-between mb-2">
             <span className="text-sm font-medium text-slate-700">Course Progress</span>
             <span className="text-sm font-medium text-slate-700">{Math.round(((currentSection + 1) / sections.length) * 100)}%</span>
           </div>
           <div className="w-full bg-slate-200 rounded-full h-2">
             <div 
               className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
               style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
             ></div>
           </div>
           
           <div className="flex justify-between mt-4">
             <button 
               onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
               disabled={currentSection === 0}
               className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
             >
               Previous
             </button>
             
             {currentSection < sections.length - 1 ? (
               <button 
                 onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
                 className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
               >
                 Next
               </button>
             ) : (
               <button
                 onClick={handleMarkComplete}
                 disabled={markingComplete || isComplete}
                 className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                   isComplete
                     ? "bg-green-100 text-green-700 cursor-default"
                     : "bg-primary-500 text-white hover:bg-primary-600 shadow-button hover:shadow-button-hover hover:-translate-y-0.5 disabled:opacity-50"
                 }`}
               >
                 {markingComplete ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                   <CheckCircle className="w-5 h-5" />
                 )}
                 {isComplete ? "Completed" : "Mark as Complete"}
               </button>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
