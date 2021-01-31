describe('Navigation - Redirects', () => {
    it('should redirect to /landings/multipurpose when navigating to /landings', () => {
        cy.visit('/landings');
        cy.location('pathname').should('eq', '/landings/multipurpose');
    });
    it('should redirect to /pages/basic-page when navigating to /pages', () => {
        cy.visit('/pages');
        cy.location('pathname').should('eq', '/pages/basic-page');
    });
});
