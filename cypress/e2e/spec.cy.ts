import { faker } from '@faker-js/faker';
import { homePage } from '../support/pages/HomePage';
import { registerPage } from '../support/pages/RegisterPage';
import { loginPage } from '../support/pages/LoginPage';

describe('RealWorld App', () => {
  const randomUsername = faker.internet.userName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();

  beforeEach(() => {
    homePage.visit();
  });

  it('Verify Homepage Load', () => {
    cy.get(homePage.navbarBrand).should('contain', 'conduit');
    cy.get(homePage.homePage).should('exist');
  });

  it('Test User Registration', () => {
    homePage.navigateToRegister();
    registerPage.register(randomUsername, randomEmail, randomPassword);
    registerPage.verifyUserRegistered(randomUsername);
  });

  it('Test Login Functionality with Valid Credentials', () => {
    homePage.navigateToLogin();
    loginPage.login(randomEmail, randomPassword);
    loginPage.verifyLogin(randomUsername);
  });

  it('Test Login Functionality with Invalid Credentials', () => {
    homePage.navigateToLogin();
    loginPage.login(faker.internet.email(), faker.internet.password());
    loginPage.verifyInvalidLogin();
  });

  it('Verify Navigation Bar Links', () => {
    homePage.visit();
    homePage.navigateToLogin();
    loginPage.navigateToRegister();
    registerPage.navigateToLogin();
    loginPage.visit();
    loginPage.navigateToRegister();
    registerPage.visit();
  });
});