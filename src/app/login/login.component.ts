import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Input() submit: boolean = false;
  @Output() submitChange : EventEmitter<boolean> = new EventEmitter();
  
  error: string ="";

  public user: User = new User();
  
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  validate(f: NgForm) : void {

    if(this.user.userName.match("^[A-Za-z0-9]*$") && this.user.password.match("^[A-Za-z0-9]*$")){ 
      this.auth.login(this.user).subscribe(
        (success) => {
          
          localStorage.setItem('access_token',success.token);
        
          this.router.navigate(['/contactus']);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
     
    }else{
      this.error = "Letters and Numbers Only";
    }
    console.log(this.submit);
    
  }

  

}
