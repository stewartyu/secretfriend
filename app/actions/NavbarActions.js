import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getMeSuccess',
      'getMeFail'
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
}

export default alt.createActions(NavbarActions);
