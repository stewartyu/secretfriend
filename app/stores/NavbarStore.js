import alt from '../alt';
import SignupActions from '../actions/SignupActions';
import SigninActions from '../actions/SigninActions';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(SignupActions);
    this.bindActions(SigninActions);
    this.bindActions(NavbarActions);
    this.me = '';
  }

  onSigninSuccess(me) {
    this.me = me;
  }

  onSignupSuccess(me) {
    this.me = me;
  }

  getMeSuccess(me) {
    if (Object.keys(me).length === 0) {
      me = '';
    }
    this.me = me;
  }

  onSignoutSuccess() {
    this.me = '';
  }
}

export default alt.createStore(NavbarStore);
