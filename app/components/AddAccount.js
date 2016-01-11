import React from 'react';
import AddAccountStore from '../stores/AddAccountStore';
import AddAccountActions from '../actions/AddAccountActions';

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddAccountStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddAccountStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddAccountStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    if (!email) {
      AddAccountActions.invalidEmail();
      this.refs.emailTextField.getDOMNode().focus();
    }

    if (!password) {
      AddAccountActions.invalidPassword();
    }

    if (email && password) {
      AddAccountActions.addAccount(email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Register</div>
              <div className='panel-body'>
                <form action='/auth/register' method='post'>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' name='username' className='form-control' ref='emailTextField' value={this.state.email}
                        onChange={AddAccountActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='password' name='password' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={AddAccountActions.updatePassword} autoFocus/>
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

export default AddAccount;
