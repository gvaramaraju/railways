import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.ticketForm = this.fb.group({
      passengerDtos: this.fb.array([
      ]),
      trainNumber: new FormControl(''),
      travelDate: new FormControl('')
    })
  }
  passenger: FormArray;
  ticketForm: FormGroup;
  trainList: any;
  error: string;
  userTicket: any;
  createDateField() {
    return this.fb.group({
      name: '',
      gender: '',
      age: ''
    })
  }
  addDateField() {
    this.passenger = this.ticketForm.get('passengerDtos') as FormArray;
    this.passenger.push(this.createDateField());
  }
  deleteDateField(i) {
    this.passenger = this.ticketForm.get('passengerDtos') as FormArray;
    this.passenger.removeAt(i);
  }
  searchTrain(form) {
    var response = this.http.post('http://localhost:8080/user/searchtrain', form.value);
    response.subscribe(data => {
      console.log(data);
      if (data) {
        this.trainList = data;
      } 
    }, err => this.error = "No Trains Available");
  }
  bookTicket(){
    console.log(this.ticketForm.value);
    var response = this.http.post('http://localhost:8080/user/addticket', this.ticketForm.value);
    response.subscribe(data => {
      console.log(data);
      if (data) {
        this.ticketForm.reset();
        
      } 
    }, err => this.error = "Booked Successfully");
  }

}
