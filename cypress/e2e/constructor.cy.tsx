import type { } from 'cypress';

describe('Application', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
        cy.intercept('GET', 'user', { fixture: 'user' });

        cy.visit('http://localhost:5173/');
    });

    it('adding an ingredient to the constructor', () => {
        const testIngredientsId = ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093c'];

        testIngredientsId.forEach(id => {
            cy.get(`[data-testid=cy_${id}] > button`).click();
            const burgerConstructor = cy.get('[data-testid=cy_burgerConstructor]');
            const item = burgerConstructor.find(`[data-testid=cy_${id}]`);
            item.should('be.visible');
        });
    });
});