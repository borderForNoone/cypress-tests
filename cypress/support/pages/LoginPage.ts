import { Page } from './Page';

export class LoginPage extends Page {
  emailInput = 'input[placeholder="Email"]';
  passwordInput = 'input[placeholder="Password"]';
  submitButton = 'button[type="submit"]';

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  login(email: string, password: string) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.submitButton).click();
  }

  verifyLogin(username: string) {
    cy.get('.navbar').should('contain', username);
  }

  navigateToRegister() {
    this.visit('/#/register');
  }

  verifyInvalidLogin() {
    cy.get('.error-messages').should('contain', 'email or password is invalid');
  }
}

export const loginPage = new LoginPage('https://demo.realworld.io');
