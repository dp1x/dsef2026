import communicationBasics from './communication-basics';
import interviewSkills from './interview-skills';
import workplaceEtiquette from './workplace-etiquette';
import timeManagement from './time-management';
import leadershipBasics from './leadership-basics';
import { getCourseMedia, getHeaderMedia, getInlineMedia } from './media';

export const courses = [
  communicationBasics,
  interviewSkills,
  workplaceEtiquette,
  timeManagement,
  leadershipBasics,
];

export { getCourseMedia, getHeaderMedia, getInlineMedia };

export function getCourseById(id: string) {
  return courses.find(course => course.id === id);
}

export function getAllCourses() {
  return courses;
}
