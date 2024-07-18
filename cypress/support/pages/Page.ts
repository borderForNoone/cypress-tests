export class Page {
    constructor(protected baseUrl: string) {}
  
    visit(path: string = '') {
      cy.visit(`${this.baseUrl}${path}`);
    }
  }
  