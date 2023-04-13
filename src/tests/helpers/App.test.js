import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const PASSWORD_INPUT = 'password-input';
const emailTest = 'usario@teste.com';
const password = '21101995';

describe('Testando os elementos referente a tela de Login renderizada pelo App', () => {
  test('Teste se existe um input para e-mail e password na tela de Login', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Teste se existe um botão e se ele continua desabilitado se algum input estiver incorreto', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '12345');
    expect(button).toBeDisabled();
  });

  test('Teste se ao clicar no botão ele muda para rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(emailInput).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Teste se na home possui o texto TrybeWallet ', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByText(/trybewallet/i);
    expect(title).toBeInTheDocument();
  });

  test('Teste se o email é salvo no estado global quando o botão é clicado', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(store.getState().user.email).toBe('');
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    expect(store.getState().user.email).toBe(emailTest);
  });
});
