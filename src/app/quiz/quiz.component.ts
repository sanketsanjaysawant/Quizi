import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MyDataService } from '../services/my-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizName = 'QUIZ APPLICATION';
  questArray: any[];
  mediatorArray: any[];
  activeArray: any[];
  storeArray = [];
  correctAns: string;
  lastIndex: number;
  questArrayIndex: number;
  permissionSubmit = false;
  permissionoptions = false;
  scores = false;
  storeCounter = 0;
  scoreCounter = 0;
  fLoop = 0;
  index = 0;




  constructor(private newService: MyDataService) {

  }

  ngOnInit() {

    this.newService.fetchData().subscribe(response => {
      this.questArray = response.json();
      this.callingArray();
    }
    );

  }

  callingArray() {
    this.mediatorArray = this.questArray[this.index];
    this.activeArray = new Array(this.mediatorArray);
    this.questArrayIndex = this.questArray.length; // For calculating the total length of array and storing it.
  }

  displayScore() {
    this.scores = !this.scores;
    this.permissionSubmit = !this.permissionSubmit;
    this.lastIndex++; // Makes the "Submit" button invisible.

    while (this.permissionoptions === false) {
      this.permissionoptions = !this.permissionoptions;
    }
  }

  next() {
    if (this.index === this.questArrayIndex - 1) {

      this.mediatorArray = this.questArray[this.index];
      this.activeArray = new Array(this.mediatorArray);
      this.fLoop++; // For comparison needed in disabling the "Next" button.

    } else {

      this.index++;
      this.mediatorArray = this.questArray[this.index];
      this.activeArray = new Array(this.mediatorArray);
      this.lastIndex = this.activeArray[0].QuestionID;

      if (this.permissionoptions === true) {
        this.permissionoptions = !this.permissionoptions;
      }
      this.fLoop++; // For comparison needed in disabling the "Next" button.
    }
  }

  filterAnswer(i: any, button: HTMLButtonElement, id: any) {
    this.correctAns = this.activeArray[0].isRight;

    if (this.correctAns === i && this.correctAns !== this.storeArray[this.storeCounter - 1]) {

      this.storeArray[this.storeCounter] = i; // Only the correct answer provided by user gets stored here.
      button.style.backgroundColor = '#50F230'; // Button color styling for correct answer.
      this.permissionoptions = !this.permissionoptions; // Disables remaining answer choices after user selects one answer choice.
      this.storeCounter++;
      this.scoreCounter++;

    } else {

      button.style.backgroundColor = '#FD3C3C'; // Button color styling for wrong answer.
      this.permissionoptions = !this.permissionoptions;

      /* 
         // Below code reduces the total score by 1 on submission of wrong answer by user. 
      
          if (this.storeArray[this.storeCounter - 1] != i) 
          {
            this.scoreCounter--;
          }
      */

    }
  }
}

/*
    // Additional Code, if "Previous" button is implemented from HTML page; Line:41.

     previous()
   {

         if(this.index==0)
         {
             this.mediatorArray = this.questArray[this.index];
             this.activeArray = new Array(this.mediatorArray)
         }
          else{
          this.index--;
          this.mediatorArray= this.questArray[this.index];
          this.activeArray = new Array(this.mediatorArray);

         }
     }
*/


