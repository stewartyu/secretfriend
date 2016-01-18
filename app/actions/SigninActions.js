import alt from '../alt';

class SigninActions {
  constructor() {
    this.generateActions(
      'signinSuccess',
      'signinFail',
      'updateEmail',
      'updatePassword',
      'invalidEmail',
      'invalidPassword'
    );
  }

  signin(email, password) {
    $.ajax({
      type: 'POST',
      url: '/auth/signin',
      headers: {"Authorization": "Basic " + btoa(encodeURIComponent(escape(email + password)))},
      data: { username: email, password: password }
    })
      .done((data) => {
        this.actions.signinSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.signinFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SigninActions);
