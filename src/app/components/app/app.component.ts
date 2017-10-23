import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../services/quiz/quiz.service';
import {Question, AnswerOption} from '../../models/app.models';
import {ToastrService} from 'ngx-toastr';
@Component({
    selector: 'app-component',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

    title = 'JavaScript Knowledge Quiz';
    questions: Question[];
    currentQuestion: Question;
    currentIndex: number;
    score: number;
    allQuestionsAnswered: boolean;
    scoreCalculated: boolean;

    constructor(private quizService: QuizService,
                private toastr: ToastrService) {
        this.currentIndex = 0;
        this.currentQuestion = {
            id: -1,
            question: '',
            answer: '',
            userAnswer: '',
            choices: []
        };
    }

    ngOnInit(): void {
        this.quizService.downloadQuestions().subscribe((questions: Question[]) => {
            this.questions = questions;
            this.currentQuestion = this.questions[0];
        });
    }

    back(): void {
        if (this.currentIndex === 0) {
            return;
        }
        this.currentIndex--;
        this.currentQuestion = this.questions[this.currentIndex] as Question;
    }

    next(): void {
        if (this.currentIndex === this.questions.length - 1) {
            return;
        }
        this.currentIndex++;
        this.currentQuestion = this.questions[this.currentIndex] as Question;
    }

    calculatScore() {
        let correctAnswers = 0;
        for (const question of this.questions) {
            if (question.answer === question.userAnswer) {
                correctAnswers++;
            }
        }
        this.score = (correctAnswers * 10);
        this.scoreCalculated = true;
    }

    onRadioButtonClick(currentAnswer: Question, selectedAnswer: AnswerOption) {
        currentAnswer.userAnswer = selectedAnswer.id.toString();
        this.areAllQuestionsAnswered();
    }

    announceEnd() {
        this.toastr.info('You have finished answering the exam.', 'Exam finished', {timeOut: 5000});
    }

    areAllQuestionsAnswered() {
        let count = 0;
        for (const question of this.questions) {
            if (question.userAnswer) {
                count++;
            }
        }
        if (count === 10) {
            this.allQuestionsAnswered = true;
            this.announceEnd();
            return;
        }
        this.allQuestionsAnswered = false;
    }
}
