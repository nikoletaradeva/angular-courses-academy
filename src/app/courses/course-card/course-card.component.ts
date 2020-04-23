import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CourseInterface from '../models/course.model';
import { CoursesService } from '../courses.service';
import AuthService from '../../auth/auth.service';
import AssigneeInterface from '../models/assignee.model';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: CourseInterface;
  @Output() onDelete = new EventEmitter();
  isAdmin = false;
  //isLoggedIn: boolean = false;

  constructor(private coursesService: CoursesService,
    private authService: AuthService,
    private router: Router) {
      //this.isLoggedIn = this.authService.isLoggedIn();
     }

  ngOnInit() {
   let rol = sessionStorage.getItem('role');
    if (rol =="admin")
    {
      this.isAdmin = true;
    }
  }

  onAssignClick() {
    const userId = this.authService.getLoggedUser().id;
    if (this.course.assignees.findIndex(u => u.id === userId) !== -1) 
      return;
    
      const assignee: AssigneeInterface = {
        name: this.authService.getLoggedUser().name,
        id: userId
      };
    this.course.assignees.push(assignee);

    this.coursesService.assignCourse(this.course).subscribe(() => {
      console.log('SUCCESS ASSIGN');
    });
  }

  onRaitingClick() {
    const userId = this.authService.getLoggedUser().id;
    this.course.rating = userId.toString();

    this.coursesService.ratingCourse(this.course).subscribe(() => {
      console.log('SUCCESS RATING');
    });
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.course.id);
  }
  onEditClick(): void {
    this.router.navigate(['courses/add-course', this.course.id]);
  }

  get canAssign(): boolean {
   const user = this.authService.getLoggedUser();

   if(!user) 
    return false;

    const userId = user.id;

    return this.course.assignees.findIndex(u => u.id === userId) === -1;
  }


}
