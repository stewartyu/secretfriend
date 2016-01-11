import alt from '../alt';
import AddAccountActions from '../actions/AddAccountActions';

class AddAccountStore {
  constructor() {
    this.bindActions(AddAccountActions);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
  }

  onAddAccountSuccess(successMessage) {
    this.emailValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddAccountFail(errorMessage) {
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

export default alt.createStore(AddAccountStore);
