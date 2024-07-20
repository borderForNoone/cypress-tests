import { Page } from './Page';

export class RegisterPage extends Page {
  private usernameInput = 'input[placeholder="Username"]';
  private emailInput = 'input[placeholder="Email"]';
  private passwordInput = 'input[placeholder="Password"]';
  private submitButton = 'button[type="submit"]';
  private errorMessages = '.error-messages';

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

  verifyRegistrationError() {
    cy.get(this.errorMessages).should('contain', 'email has already been taken');
  }

  navigateToLogin() {
    this.visit('/#/login');
  }
}

export const registerPage = new RegisterPage('https://demo.realworld.io');
