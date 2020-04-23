import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';
import AuthService from '../../auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserInterface;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onBlocked: EventEmitter<number> = new EventEmitter();
  isAdmin = false;

  //@Input() isAdmin: boolean = false;
  //@Input() currentUserId: number;


  constructor(private router: Router) { }

  ngOnInit() {
    let rol = sessionStorage.getItem('role');
    if (rol =="admin")
    {
      this.isAdmin = true;
    }
    
  }
  
  getUserImage() {
    return this.user.picture + "?random=" + this.user.id;
  }
  onDeleteClicked() {
    this.onDelete.emit(this.user.id);
  }
  isBlockedClicked() {
    this.onBlocked.emit(this.user.id);
  }

  onUserEdit(){
    this.router.navigate(['users/add', this.user.id]);

  }
  /*get canManipulate(): boolean {
    return this.isAdmin && this.currentUserId !== this.user.id;
  }*/

}
