import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ModalModule, BsDropdownModule} from 'ngx-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AppComponent} from './components/app/app.component';
import {QuizService} from './services/quiz/quiz.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [QuizService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
