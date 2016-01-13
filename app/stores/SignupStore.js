import alt from '../alt';
import SignupActions from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
  }

  onSignupSuccess(successMessage) {
    this.emailValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onSignupFail(errorMessage) {
    this.emailValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
    this.helpBlock = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
  }

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid email address.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
  }
}

export default alt.createStore(SignupStore);
