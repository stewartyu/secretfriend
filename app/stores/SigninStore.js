import alt from '../alt';
import SigninActions from '../actions/SigninActions';

class SigninStore {
  constructor() {
    this.bindActions(SigninActions);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
  }

  onSigninSuccess(successMessage) {
    this.emailValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onSigninFail(errorMessage) {
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

export default alt.createStore(SigninStore);
