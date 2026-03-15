import { CourseMedia } from '@/lib/types/course';

export const courseMedia: Record<string, CourseMedia[]> = {
  'communication-basics': [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80',
      position: 'header',
      alt: 'People having a workplace conversation',
      caption: 'Effective communication builds stronger teams'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/Ra6L83XwLko',
      position: 'inline',
      sectionId: 'module-2',
      caption: 'Active Listening Skills Tutorial'
    }
  ],
  'interview-skills': [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1565688594246 hybrid-6c6dbc9?w=1200&q=80',
      position: 'header',
      alt: 'Professional job interview setting',
      caption: 'Preparation is the key to interview success'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f03?w=800&q=80',
      position: 'inline',
      sectionId: 'module-3',
      alt: 'Confident professional in interview',
      caption: 'Confidence comes from preparation'
    }
  ],
  'workplace-etiquette': [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      position: 'header',
      alt: 'Modern office workspace',
      caption: 'Professional environments require professional behavior'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1521737711860-e3b04e6b4c29?w=800&q=80',
      position: 'inline',
      sectionId: 'module-2',
      alt: 'Team collaboration in office',
      caption: 'Respect and courtesy build strong workplace relationships'
    }
  ],
  'time-management': [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b7173?w=1200&q=80',
      position: 'header',
      alt: 'Calendar and planning tools',
      caption: 'Time is your most valuable resource'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      position: 'inline',
      sectionId: 'module-1',
      alt: 'Priority planning and organization',
      caption: 'Prioritize what matters most'
    }
  ],
  'leadership-basics': [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7fdbe?w=1200&q=80',
      position: 'header',
      alt: 'Team leader guiding a group',
      caption: 'Leadership is about empowering others'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1552664739-d9259e36b0d4?w=800&q=80',
      position: 'inline',
      sectionId: 'module-3',
      alt: 'Team meeting and collaboration',
      caption: 'Great leaders build great teams'
    }
  ]
};

export function getCourseMedia(courseId: string): CourseMedia[] {
  return courseMedia[courseId] || [];
}

export function getHeaderMedia(courseId: string): CourseMedia | undefined {
  const media = courseMedia[courseId];
  return media?.find(m => m.position === 'header');
}

export function getInlineMedia(courseId: string, sectionId: string): CourseMedia | undefined {
  const media = courseMedia[courseId];
  return media?.find(m => m.position === 'inline' && m.sectionId === sectionId);
}
