describe('Bookmark Functionality', () => {

    it('should redirect to home page after loggin in', () => {
      cy.visit('http://localhost:3000/component/signin')
      cy.get('input[placeholder="Enter Email Address"]').type('melkemk503@gmail.com');
    cy.get('input[placeholder="Enter Password"]').type('yourpassword');
    cy.get('input[type="submit"]').click();
      cy.url().should('include', '/');
    }
);


it('should check if a job is bookmarked or not', () => {
    cy.visit('http://localhost:3000/component/signin')
    cy.get('input[placeholder="Enter Email Address"]').type('melkemk503@gmail.com');
  cy.get('input[placeholder="Enter Password"]').type('yourpassword');
  cy.get('input[type="submit"]').click();
      cy.get('[data-testid="bookmark-button"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="bookmark-button"]').first().invoke('attr', 'style').then((style) => {
        if (style.includes('rgba(255, 184, 54, 1)')) {
          cy.log('The job is bookmarked');
        } else {
          cy.log('The job is not bookmarked');
        }
      });
    });
  });
  