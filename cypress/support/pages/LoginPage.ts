import { Page } from './Page';

export class LoginPage extends Page {
  private emailInput = 'input[placeholder="Email"]';
  private passwordInput = 'input[placeholder="Password"]';
  private submitButton = 'button[type="submit"]';
  private errorMessages = '.error-messages';

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

  verifyInvalidLogin() {
    cy.get(this.errorMessages).should('contain', 'email or password is invalid');
  }

  navigateToRegister() {
    this.visit('/#/register');
  }
}

export const loginPage = new LoginPage('https://demo.realworld.io');
