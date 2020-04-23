import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import CourseInterface from '../models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm:FormGroup;

  constructor(private fb:FormBuilder,
    private coursesService:CoursesService,
    private router:Router,
    private route:ActivatedRoute) {
      this.route.params.subscribe((params) =>{
        console.log(params);

        if(params.id){
          this.coursesService.getById(params.id).subscribe((course) =>{
            this.cereateForm();

            this.courseForm.patchValue({...course})
          });
        }
      });

      this.cereateForm();
     }

  ngOnInit() {
  }

  private cereateForm(): void{
    this.courseForm=this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['', Validators.required],
      assignees: ['']
    });

  }

  onFormSubmit(event): void{
    const newCourse = { ...this.courseForm.value} as CourseInterface;
    newCourse.assignees = newCourse.assignees || [];
    this.coursesService.addNewCourse(newCourse)
    .subscribe(()=>{
      console.log('COURSE CREATED');
      this.router.navigateByUrl('courses/list')
    })
  }

  get isFormValid(): boolean{
    return this.courseForm.valid;
  }
  get title(){
    return this.courseForm.get('title');
  }
  get description(){
    return this.courseForm.get('description');
  }
  get rating(){
    return this.courseForm.get('rating');
  }
}
