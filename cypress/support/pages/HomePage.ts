import { Page } from './Page';

export class HomePage extends Page {
  navbarBrand = '.navbar-brand';
  homePage = '.home-page';

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  navigateToRegister() {
    this.visit('/#/register');
  }

  navigateToLogin() {
    this.visit('/#/login');
  }
}

export const homePage = new HomePage('https://demo.realworld.io');
