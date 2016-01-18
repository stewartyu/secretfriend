import React from 'react';
import SigninStore from '../stores/SigninStore';
import SigninActions from '../actions/SigninActions';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = SigninStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SigninStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SigninStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    if (!email) {
      SigninActions.invalidEmail();
      this.refs.emailTextField.getDOMNode().focus();
    }

    if (!password) {
      SigninActions.invalidPassword();
    }

    if (email && password) {
      SigninActions.signin(email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Signin</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' name='username' className='form-control' ref='emailTextField' value={this.state.email}
                        onChange={SigninActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='password' name='password' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={SigninActions.updatePassword} autoFocus/>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
