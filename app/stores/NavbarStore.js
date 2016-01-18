import alt from '../alt';
import SignupActions from '../actions/SignupActions';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(SignupActions);
    this.bindActions(NavbarActions);
    this.me = '';
  }

  onSignupSuccess(me) {
    this.me = me;
  }

  getMeSuccess(me) {
    this.me = me;
  }
}

export default alt.createStore(NavbarStore);
