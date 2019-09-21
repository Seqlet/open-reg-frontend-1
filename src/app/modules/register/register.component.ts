import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChulaSsoService } from 'src/app/core/services/chula-sso.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isSSOAuthenticated$ = this.chulaSSOService.isSSOAuthenticated$;
  currentStep$ = this.registerService.currentStep$;

  constructor(
    private chulaSSOService: ChulaSsoService,
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngOnInit() {}

  debug() {
    // console.log(this.questions$.value, this.steps, this.form, this.questions$, 'debug')
  }

  get form() {
    return this.registerService.form;
  }

  get questions$() {
    return this.registerService.questions$;
  }

  get steps() {
    return this.registerService.groups;
  }

  get currentStepObj() {
    return this.steps[this.currentStep$.value - 1];
  }

  get currentFormObj() {
    return this.form.controls[0]
      ? this.form.controls[this.currentStep$.value - 1]
      : this.form;
  }

  get totalSteps() {
    return this.steps.length;
  }

  get eventName() {
    return this.registerService.eventName;
  }

  loginSSO() {
    this.chulaSSOService.login();
  }
  logoutSSO() {
    this.chulaSSOService.logout();
  }

  nextStep() {
    if (this.currentStep$.value === this.totalSteps) {
      this.router.navigate(['/attend']);
    } else {
      this.currentStep$.next(this.currentStep$.value + 1);
    }
  }

  previousStep() {
    this.currentStep$.next(this.currentStep$.value - 1);
  }

  ngOnDestroy() {
    this.registerService.complete();
  }
}
