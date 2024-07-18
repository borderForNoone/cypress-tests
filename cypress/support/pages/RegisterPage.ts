import { Page } from './Page';

export class RegisterPage extends Page {
  usernameInput = 'input[placeholder="Username"]';
  emailInput = 'input[placeholder="Email"]';
  passwordInput = 'input[placeholder="Password"]';
  submitButton = 'button[type="submit"]';

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  register(username: string, email: string, password: string) {
    cy.get(this.usernameInput).type(username);
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.submitButton).click();
  }

  verifyUserRegistered(username: string) {
    cy.get('.navbar').should('contain', username);
  }

  navigateToLogin() {
    this.visit('/#/login');
  }
}

export const registerPage = new RegisterPage('https://demo.realworld.io');
