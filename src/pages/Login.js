import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyInput);
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const testingEmail = regexEmail.test(email);
    const numberMin = 6;
    const testingPassword = password.length >= numberMin;
    this.setState({ disabledButton: !(testingEmail && testingPassword) });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email, password } = this.state;
    history.push('/carteira');
    dispatch(saveLogin({ email, password }));
  };

  render() {
    const { disabledButton, email, password } = this.state;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <input
          type="email"
          data-testid="password-input"
          onChange={ this.handleChange }
          name="password"
          value={ password }
        />
        <button
          type="button"
          disabled={ disabledButton }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
