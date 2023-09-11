import React from 'react';
import { Button, Container, ThemeProvider,
  Box, InputAdornment, TextField, FormControl } from '@mui/material/';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wallet from '../themes/wallet.png';
import { Light } from '../themes/Light';
import { Dark } from '../themes/Dark';
import { saveLogin } from '../redux/actions';

const colorIcons = 'icons.primary';
const colorIconsMood = 'icons.secondary';
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
    theme: 'light',
    showPassword: false,
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'dark' ? 'ligth' : 'dark',
    }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyInput);
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState(({ showPassword: !showPassword })); // se for true vira false e vice versa
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    const { email } = this.state;
    history.push('/carteira');
    dispatch(saveLogin(email));
    this.toggleTheme();
  };

  render() {
    const { disabledButton, email, theme, showPassword } = this.state;
    return (
      <ThemeProvider theme={ theme === 'dark' ? Dark : Light }>
        <Box
          className="box"
          sx={ {
            bgcolor: 'background.default',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            widht: '100vw',

          } }
        >

          <Container
            disableGutters
            sx={ {
              pt: '20px',
              justifyContent: 'center',
              display: 'grid',

            } }
          >
            <img
              id="image"
              src={ wallet }
              alt="logo"
              width="400px"
            />
            {
              theme === 'dark' ? (
                <IconButton
                  onClick={ this.toggleTheme }
                  sx={ {
                    mx: '190px',
                    color: colorIconsMood,
                    justifyContent: 'start',
                  } }
                >
                  <Brightness2Icon />

                </IconButton>)
                : (
                  <IconButton
                    onClick={ this.toggleTheme }
                    sx={ {
                      mx: '190px',
                      color: colorIconsMood,
                    } }

                  >
                    <LightModeIcon />
                  </IconButton>)
            }

            <FormControl sx={ { m: 2, gap: '20px' } } variant="outlined">
              <TextField
                id="input-with-icon-textfield"
                label="Email:"
                data-testid="email-input"
                onChange={ this.handleChange }
                name="email"
                value={ email }
                autoComplete="off"
                InputLabelProps={ {
                  style: { color: '#ab47bc', fontSize: 16 },
                } }
                InputProps={ {
                  startAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle sx={ { color: colorIcons, mr: '15px' } } />
                    </InputAdornment>
                  ),
                } }
              />
              <TextField
                id="input-with-icon-textfield"
                label="Password:"
                type={ showPassword ? 'text' : 'password' }
                data-testid="password-input"
                onChange={ this.handleChange }
                name="password"
                InputLabelProps={ {
                  style: { color: '#ab47bc', fontSize: 16 },
                } }
                InputProps={ {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={ {
                        color: 'text.primary',
                      } }

                    >
                      <IconButton
                        sx={ { color: colorIcons } }
                        aria-label="toggle password visibility"
                        onClick={ this.handleClickShowPassword }
                        onMouseDown={ this.handleMouseDownPassword }
                        // edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                } }
              />
            </FormControl>

            <Button
              variant="contained"
              type="button"
              disabled={ disabledButton }
              onClick={ this.handleClick }
              className="buttonEnter"
              sx={ { my: '10px', mx: '130px' } }
            >
              Entrar

            </Button>
          </Container>
        </Box>

      </ThemeProvider>
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
