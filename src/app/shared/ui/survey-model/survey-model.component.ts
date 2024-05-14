import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-survey-model',
  templateUrl: './survey-model.component.html',
  styleUrls: ['./survey-model.component.scss']
})
export class SurveyModelComponent implements OnInit{
  currentPage = 1;

  isLoading: boolean = false;
  constructor( private cdRef: ChangeDetectorRef,public modal: NgbActiveModal) { }
  theme = 'purple';

  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

  survey = {
    title: "Employee Wellness Survey 2023",
    description: "The Employee Wellness Survey 2023 aims to assess various aspects of your well-being, including physical health, mental well-being, work-life balance, and workplace satisfaction.",

  };

  questions = [
    {
      question: "1. How often do you engage in physical exercise?",
      options: [
        {
          label: "Daily",
          value: "Daily"
        },
        {
          label: "3-4 times a week",
          value: "3-4 times a week"
        },
        {
          label: "1-2 times a week",
          value: "1-2 times a week"
        },
        {
          label: "Rarely or never",
          value: "Rarely or never"
        }
      ]
    },
    {
      question: "2. How would you rate your stress levels at work?",
      options: [
        {
          label: "Very low",
          value: "Very low"
        },
        {
          label: "Low",
          value: "low"
        },
        {
          label: "Moderate",
          value: "moderate"
        },
        {
          label: "High",
          value: "high"
        }

      ]
    }
  ];

  nextPageQuestions = [
    {
      question: "3. How often do you take breaks during work hours",
      options: [
        {
          label: " Regularly, every 1-2 hours",
          value: " Regularly, every 1-2 hours"
        },
        {
          label: " Occasionally, every 3-4 hours",
          value: " Occasionally, every 3-4 hours"
        },
        {
          label: "Rarely, once a day",
          value: "Rarely, once a day"
        },
        {
          label: "Never",
          value: "Never"
        }
      ]
    },
    {
      question: "4. What is your preferred method for managing stress",
      options: [
        {
          label: "Exercise or physical activity",
          value: "Exercise or physical activity"
        },
        {
          label: "Meditation or mindfulness techniques",
          value: "Meditation or mindfulness techniques"
        },
        {
          label: "Talking to a friend or colleague",
          value: "Talking to a friend or colleague"
        },
        {
          label: "Other ",
          value: "Other "
        }

      ]
    }
  ];



  executeAction(action: string) {

    eval(action);
  }
}
