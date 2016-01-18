import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.me = '';
  }

  onGetMeSuccess(data) {
      console.log('onGetMeSuccess: ' + data);
    this.me = data;
  }

  onGetMeFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(NavbarStore);
