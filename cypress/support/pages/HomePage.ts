import { Page } from './Page';

export class HomePage extends Page {
  private articlePreviewSelector = '.article-preview';
  private navbar = '.navbar';
  private logoutButton = 'button'; 
  private popularTagsSelector = '.tag-list a';

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  navigateToRegister() {
    cy.get('a[href="#/register"]').click();
  }

  navigateToLogin() {
    cy.get('a[href="#/login"]').click();
  }

  verifyHomepageLoad() {
    cy.get(this.navbarBrand).should('contain', 'conduit');
    cy.get('.home-page').should('exist');
  }

  verifyArticlePreviewExists() {
    cy.get(this.articlePreviewSelector).should('have.length.greaterThan', 0);
  }

  clickFirstArticlePreview() {
    cy.get(this.articlePreviewSelector).first().click();
  }

  clickNewArticle() {
    cy.get(this.navbar).contains('New Article').click();
  }

  interceptAndWaitForArticles() {
    cy.intercept('GET', '**/articles*').as('getArticles');
    cy.wait('@getArticles');
  }

  clickSettings() {
    cy.get(this.navbar).contains('Settings').click();
  }

  logout() {
    cy.get(this.logoutButton).contains('Or click here to logout').click();
  }

  verifyCurrentUrlIncludes(path: string) {
    cy.url({ timeout: 10000 }).should('include', path);
  }

  verifyPopularTagsExist() {
    cy.get(this.popularTagsSelector).should('have.length.greaterThan', 0);
  }

  clickFirstPopularTag() {
    cy.get(this.popularTagsSelector).first().click();
  }

  verifyTagArticles(tag: string) {
    cy.url({ timeout: 15000 }).should('include', `tag=${tag}`);
    cy.get(this.articlePreviewSelector).each(($article) => {
      cy.wrap($article).find('.tag-list').should('contain.text', tag);
    });
  }
}

export const homePage = new HomePage('https://demo.realworld.io');
