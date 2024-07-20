import { Page } from './Page';

export class CreateArticlePage extends Page {
  private articlePageSelector = '.article-page';
  private articleContentSelector = '.article-content';

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  createArticle(title: string, description: string, body: string) {
    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get('input[placeholder="What\'s this article about?"]').type(description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('button[type="submit"]').click();
  }

  verifyCreateArticleForm() {
    cy.get('input[placeholder="Article Title"]').should('exist');
    cy.get('input[placeholder="What\'s this article about?"]').should('exist');
    cy.get('textarea[placeholder="Write your article (in markdown)"]').should('exist');
  }

  verifyArticlePage() {
    cy.get(this.articlePageSelector, { timeout: 10000 }).should('exist');
    cy.get(this.articleContentSelector).should('exist');
  }
}

export const createArticlePage = new CreateArticlePage('https://demo.realworld.io');
