import React from 'react';
import SignupStore from '../stores/SignupStore';
import SignupActions from '../actions/SignupActions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    if (!email) {
      SignupActions.invalidEmail();
      this.refs.emailTextField.getDOMNode().focus();
    }

    if (!password) {
      SignupActions.invalidPassword();
    }

    if (email && password) {
      SignupActions.addAccount(email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Sign Up</div>
              <div className='panel-body'>
                <form action='/auth/signup' method='post'>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' name='username' className='form-control' ref='emailTextField' value={this.state.email}
                        onChange={SignupActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='password' name='password' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={SignupActions.updatePassword} autoFocus/>
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

export default Signup;
