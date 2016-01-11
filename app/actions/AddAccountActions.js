import alt from '../alt';

class AddAccountActions {
  constructor() {
    this.generateActions(
      'addAccountSuccess',
      'addAccountFail',
      'updateEmail',
      'updatePassword',
      'invalidEmail',
      'invalidPassword'
    );
  }

  addAccount(email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/user/register',
      headers: {"Authorization": "Basic " + btoa(encodeURIComponent(escape(email + password)))},
      data: { email: email, password: password }
    })
      .done((data) => {
        this.actions.addAccountSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addAccountFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddAccountActions);
