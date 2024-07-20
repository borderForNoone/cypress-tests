import { faker } from '@faker-js/faker';
import { homePage } from '../support/pages/HomePage';
import { registerPage } from '../support/pages/RegisterPage';
import { loginPage } from '../support/pages/LoginPage';
import { createArticlePage } from '../support/pages/CreateArticlePage';

describe('RealWorld App', () => {
  const randomUsername = faker.internet.userName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();

  beforeEach(() => {
    homePage.visit();
  });
  
  it('Verify Homepage Load', () => {
    homePage.verifyHomepageLoad();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  });

  it('Test User Registration', () => {
    homePage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
    registerPage.register(randomUsername, randomEmail, randomPassword);
    registerPage.verifyUserRegistered(randomUsername);
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  });

  it('Test Login Functionality with Valid Credentials', () => {
    homePage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.login(randomEmail, randomPassword);
    loginPage.verifyLogin(randomUsername);
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  });

  it('Test Login Functionality with Invalid Credentials', () => {
    homePage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.login(faker.internet.email(), faker.internet.password());
    loginPage.verifyInvalidLogin();
  });

  it('Verify Navigation Bar Links', () => {
    homePage.visit();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
    homePage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
    registerPage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.visit();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
    loginPage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
    registerPage.visit();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  });

  it('Test User Logout Functionality', () => {
    homePage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.login(randomEmail, randomPassword);
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
    homePage.clickSettings();
    homePage.verifyCurrentUrlIncludes('/#/settings');
    homePage.logout();
    homePage.verifyHomepageLoad();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  });
  
  it('Test Registration with Existing Email', () => {
    homePage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
    registerPage.register(faker.internet.userName(), randomEmail, faker.internet.password());
    registerPage.verifyRegistrationError();
  });  
  
  it('Test Navigation Between Pages', () => {
    homePage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
  
    registerPage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
  
    loginPage.visit();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
  
    homePage.navigateToRegister();
    homePage.verifyCurrentUrlIncludes('/#/register');
  });

  it('Test Viewing Articles', () => {
    homePage.visit();
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
    homePage.interceptAndWaitForArticles();
    homePage.verifyArticlePreviewExists();
    homePage.clickFirstArticlePreview();
    createArticlePage.verifyArticlePage();
  });
  
  it('Test Creating a New Article form exists', () => {
    homePage.navigateToLogin();
    homePage.verifyCurrentUrlIncludes('/#/login');
    loginPage.login(randomEmail, randomPassword);
    homePage.verifyCurrentUrlIncludes('https://demo.realworld.io/');
    homePage.clickNewArticle(); 
    homePage.verifyCurrentUrlIncludes('/#/editor');
    createArticlePage.verifyCreateArticleForm();
  });
});
