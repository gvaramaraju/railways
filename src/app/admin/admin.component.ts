import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
    this.getStations();
  }

  ngOnInit() {

  }
  error: string;
  stationOptions: any;
  addTrain(form) {
    console.log(form.value); 
    var response = this.http.post('http://localhost:8080/admin/addtrain', form.value);
    response.subscribe(data => {
      console.log(data);
      if (data) {
        this.error = 'Success!!!'
        form.reset();
      }
    }, err => this.error = "Wrong Details Entered");
  }
  addStation(form) {
     
    var response = this.http.post('http://localhost:8080/admin/addstation', form.value);
    response.subscribe(data => {
      console.log(data);
      if (data) {
        this.error = 'Success!!!'
        form.reset();  
      }
    }, err => this.error = "Wrong Details Entered");
  }
  getStations() {
    var response = this.http.get('http://localhost:8080/user/stations');
    response.subscribe(data => {
      if (data) {
        console.log(data);
        this.stationOptions = data;
      }
    }, err => this.error = "Cant Fetch Details");

  }
}
