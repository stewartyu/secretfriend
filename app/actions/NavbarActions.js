import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getMeSuccess',
      'getMeFail',
      'signoutSuccess'
    );
  }

  getMe(data) {
    $.ajax({ url: '/auth/me' })
      .done((data) => {
        this.actions.getMeSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getMeFail(jqXhr)
    });
  }

  signout() {
      $.ajax({ url: '/auth/signout' })
        .done((data) => {
          this.actions.signoutSuccess(data);
        });
  }
}

export default alt.createActions(NavbarActions);
