import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register', // name of component
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    )
  }



  onSubmit(): void {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      
      // Send the data to the server to verify the user login
      // navigate after successful login.



    }

  }
}
