export class Page {
  navbarBrand = '.navbar-brand';

  constructor(protected baseUrl: string) {}
  
  visit(path: string = '') {
    cy.visit(`${this.baseUrl}${path}`);
  }
}
  