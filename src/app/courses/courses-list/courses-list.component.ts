import { Component, OnInit } from '@angular/core';
import CourseInterface from '../models/course.model';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
//import AuthService from '../../auth/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: CourseInterface[] = [];
  //currentCourse: CourseInterface;
   isAdmin=false;

  constructor(private coursesService: CoursesService,
    //private authService: AuthService,
              private router:Router) {
                //this.currentCourse = this.authService.getLoggedUser();
               }

  ngOnInit() {
    let rol = sessionStorage.getItem('role');
    if (rol =="admin")
    {
      this.isAdmin = true;
    }

    this.coursesService.getAllCourses().subscribe((courses) => {
      console.log(courses);
      this.courses = courses;
    });
  }

  onCourseDeleted(id: string): void {
    
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== id);
    });
  }
  onAddCourse(): void{
    this.router.navigateByUrl('/courses/add-course')

  }

}
