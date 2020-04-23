import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CourseInterface from './models/course.model';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>('http://localhost:3000/courses');
  }
  getById(id: string):Observable<CourseInterface>{
    return this.http.get<CourseInterface>(`http://localhost:3000/courses/${id}`);
   }

  public ratingCourse(course: CourseInterface): Observable<any> {
    return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
  }

  public assignCourse(course: CourseInterface): Observable<any> {
    return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
  }

  public deleteCourse(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/courses/`  + id);
  }

  addNewCourse(course:CourseInterface):Observable<any>{
    if (course.id) {
      return this.http.put(`http://localhost:3000/courses/${course.id}`, course)
      
    }
    return this.http.post('http://localhost:3000/courses', course)
  }
 
}
