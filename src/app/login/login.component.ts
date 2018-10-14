import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  user = {
    "userName": "Raju",
    "password": "Raju",
    "email": "raju@raju.com",
    "phoneNumber": "999999999",
    "billingAddress": "Chennai",
    "age": 21,
    "gender": "Male"
  };
  see: any;
  error: string;

  login(form) {
    if (form['userName'] == '' || form['password'] == '') {
      this.error = 'Enter Credentials';
    } else {
      var response = this.http.post('http://localhost:8080/user/authenthicate', form);
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
      }, err => this.error = "Unauthorized");
    }
  }
  redirectToSignup() {
    this.router.navigate(['signup']);
  }


}
