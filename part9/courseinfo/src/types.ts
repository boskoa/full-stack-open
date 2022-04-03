export interface CourseName {
  courseName: string;
}

export interface Parts {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseDescription {
  requirements: string[],
  type: "special"
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface PartProp {
  part: CoursePart;
}