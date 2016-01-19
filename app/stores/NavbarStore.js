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

  setMe(me) {
    if (Object.keys(me).length === 0) {
      me = '';
    }
    this.me = me;
  }

  onSigninSuccess(me) {
    this.setMe(me);
  }

  onSignupSuccess(me) {
    this.setMe(me);
  }

  getMeSuccess(me) {
    this.setMe(me);
  }

  onSignoutSuccess() {
    this.setMe('');
  }
}

export default alt.createStore(NavbarStore);
