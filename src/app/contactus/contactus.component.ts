import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  @Input() submit: boolean = false;
  @Output() submitChange : EventEmitter<boolean> = new EventEmitter();

  name: string = "";
  email: string = "";
  message: string = "";
  error: string ="";

  constructor() { }

  validate(f: NgForm) : void {
    

    if(f.value.name != null && f.value.email != null && f.value.message != null){ 
      this.submitChange.emit(true);
      this.submit = true;
      this.error = "";
      
    }else{
      this.error = "Please fill in all blanks";
    }
    console.log(this.submit);
    
  }

  ngOnInit(): void {
  }

}
