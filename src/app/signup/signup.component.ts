import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  error:string
  signUp(form) { 
      var response = this.http.post('http://localhost:8080/user/adduser', form);
      response.subscribe(data => {
        console.log(data);
        if (data) {
          if (data['role'] == "Admin") {
            this.router.navigate(['admin']);
          }
          else {
            this.router.navigate(['user']);
          }
        }
      }, err => this.error = "Kindly verify enetered details");
    }
  
}
