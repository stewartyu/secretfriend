import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getMeSuccess',
      'getMeFail',
      'signupSuccess'
    );
  }

  signupSuccess(data) {
      console.log('signupSucces: ' + data);
      this.actions.getMeSuccess(data);
    /*$.ajax({ url: '/auth/me' })
      .done((data) => {
        this.actions.getMeSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getMeFail(jqXhr)
    });*/
  }
}

export default alt.createActions(NavbarActions);
