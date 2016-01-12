import alt from '../alt';

class SigninActions {
  constructor() {
    this.generateActions(
      'SigninSuccess',
      'SigninFail',
      'updateEmail',
      'updatePassword',
      'invalidEmail',
      'invalidPassword'
    );
  }

  Signin(email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/user/register',
      headers: {"Authorization": "Basic " + btoa(encodeURIComponent(escape(email + password)))},
      data: { email: email, password: password }
    })
      .done((data) => {
        this.actions.SigninSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.SigninFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SigninActions);
