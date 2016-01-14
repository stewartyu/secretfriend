import alt from '../alt';

class SignupActions {
  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
      'updateEmail',
      'updatePassword',
      'invalidEmail',
      'invalidPassword'
    );
  }

  signup(email, password) {
    $.ajax({
      type: 'POST',
      url: '/auth/signup',
      headers: {"Authorization": "Basic " + btoa(encodeURIComponent(escape(email + password)))},
      data: { username: email, password: password }
    })
      .done((data) => {
        this.actions.signupSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.signupFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SignupActions);
