import AssigneeInterface from './assignee.model';
export default interface CourseInterface {
    id?:string;
    title?:string;
    description?:string;
    rating:string;
    assignees?: AssigneeInterface[];
}