import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
// import fetchCurrencies from '../../utils/fetchCurrencies';

const PASSWORD_INPUT = 'password-input';
const emailTest = 'usario@teste.com';
const password = '21101995';
const value = 'value-input';
const description = 'description-input';

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

describe('Testando a pagina Wallet', () => {
  test('teste se existe um botão adicionar despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const buttonAdicDespensa = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicDespensa).toBeInTheDocument();
  });

  test('teste se existe os inputs e selects', () => {
    renderWithRouterAndRedux(<Wallet />);
    const getValue = screen.getByTestId(value);
    expect(getValue).toBeInTheDocument();
    const getSelectCurrency = screen.getByTestId('currency-input');
    expect(getSelectCurrency).toBeInTheDocument();
    const getInputMethod = screen.getByTestId('method-input');
    expect(getInputMethod).toBeInTheDocument();
    const getSelectTag = screen.getByTestId('tag-input');
    expect(getSelectTag).toBeInTheDocument();
    const getDescription = screen.getByTestId(description);
    expect(getDescription).toBeInTheDocument();
  });

  test('teste se ao preencher os inputs e selects e apertar no botão uma despesa é acrescentada', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);
    expect(store.getState().wallet.expenses).toHaveLength(0);
    const getValue = screen.getByTestId(value);
    userEvent.type(getValue, '21');
    const getDescription = screen.getByTestId(description);
    userEvent.type(getDescription, 'Olá, isso é um teste');
    const buttonAdicDespensa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdicDespensa);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(screen.getByRole('cell', { name: /olá, isso é um teste/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /21\.00/i })).toBeInTheDocument();
    });
  });

  test('teste se ao editar a despesa e clicar no botão editar despesas os valores são atualizados ', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const getValue = screen.getByTestId(value);
    userEvent.type(getValue, '21');
    const getDescription = screen.getByTestId(description);
    userEvent.type(getDescription, 'Olá, isso é um teste');
    const buttonAdicDespensa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdicDespensa);

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /olá, isso é um teste/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /21\.00/i })).toBeInTheDocument();
    });

    const buttonEdit = screen.getByRole('button', { name: /editar/i });
    userEvent.click(buttonEdit);
    userEvent.type(getValue, '12');
    userEvent.type(getDescription, 'Despesa Editada');

    const buttonRemove = await screen.getByRole('button', { name: /excluir/i });
    expect(buttonRemove).toBeInTheDocument();
    const buttonEdited = await screen.findByRole('button', { name: /editar despesa/i });

    userEvent.click(buttonEdited);
    const edited = screen.getByRole('cell', { name: /despesa editada/i });
    const valueEdit = screen.getByRole('cell', { name: /12\.00/i });
    expect(edited).toBeInTheDocument();
    expect(valueEdit).toBeInTheDocument();

    userEvent.click(buttonRemove);
  });
});
