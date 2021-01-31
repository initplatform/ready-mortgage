describe('Forms - Lead Capture', () => {
    it('should signup', () => {
        cy.visit('/landings/lead-capture');
        cy.get('[data-cy=submitButton]').should('be.disabled');
        cy.get('[data-cy=firstNameInput]').type('Testy');
        cy.get('[data-cy=lastNameInput]').type('McTestface');
        cy.get('[data-cy=emailInput]').type('test@test.test');
        cy.get('[data-cy=companyInput]').type('Testers Inc.');
        cy.get('[data-cy=submitButton]').click();
        cy.get('ngb-modal-window').should('be.visible');
    });
});
