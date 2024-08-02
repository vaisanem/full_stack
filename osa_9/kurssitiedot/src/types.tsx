export interface HeaderProps {
	courseName: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartExtended extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartExtended {
  type: "basic";
}

export interface CoursePartMaterial extends CoursePartExtended {
  type: "material";
  material: string;
}

export interface CoursePartPrerequisite extends CoursePartExtended {
  type: "prerequisite";
  prerequisites: string[];
}

export interface CoursePartProject extends CoursePartBase {
  type: "project";
  projectExerciseCount: number;
}

export type CoursePart = CoursePartBasic | CoursePartMaterial | CoursePartPrerequisite | CoursePartProject;

export interface PartProps {
  part: CoursePart;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
	totalExercises: number;
}