import type { } from 'cypress';

describe('Application', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
        cy.intercept('GET', 'user', { fixture: 'user' });
        cy.intercept('POST', 'orders', { fixture: 'orderRequest' })

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

    it('opening the ingredient modal', () => {
        const testIngredientId = '643d69a5c3f7b9001cfa0941';
        cy.get(`[data-testid=cy_${testIngredientId}]`).click();

        const modal = cy.get('[data-testid=cy_modal]');
        modal.should('be.visible');

        const detailsElement = modal.find(`[data-testid=cy_ingredientDetails_${testIngredientId}]`);
        detailsElement.should('be.visible');
    });

    it('closing the modal of the ingredient by clicking on the button', () => {
        const testIngredientId = '643d69a5c3f7b9001cfa093c';
        cy.get(`[data-testid=cy_${testIngredientId}]`).click();

        const modal = cy.get('[data-testid=cy_modal]');
        modal.should('be.visible');

        modal.find('[data-testid=cy_modal_closeButton]').click();
        modal.should('not.exist');
    });

    it('closing the modal of an ingredient by clicking on the overlay', () => {
        const testIngredientId = '643d69a5c3f7b9001cfa093c';
        cy.get(`[data-testid=cy_${testIngredientId}]`).click();

        const modal = cy.get('[data-testid=cy_modal]');
        modal.should('be.visible');

        const overlay = cy.get('[data-testid=cy_modal_overlay]');
        overlay.click({ force: true });
        modal.should('not.exist');
    });

    it('assembling a burger and placing an order', () => {
        const burgerIngredients = ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0944'];

        burgerIngredients.forEach(id => {
            cy.get(`[data-testid=cy_${id}] > button`).click();
        });

        cy.get('[data-testid=cy_burgerConstructor_submitSection] > button').click();

        const modal = cy.get('[data-testid=cy_modal]');
        modal.should('be.visible');

        const title = cy.get('[data-testid=cy_orderDetails_title]');
        title.should('be.visible');
        title.should('have.text', '70000');
        
        modal.find('[data-testid=cy_modal_closeButton]').click({ multiple: true });
        modal.should('not.exist');

        cy.get('[data-testid=cy_burgerConstructor_defaultBun_1]').should('be.visible');
        cy.get('[data-testid=cy_burgerConstructor_defaultIngredient]').should('be.visible');
        cy.get('[data-testid=cy_burgerConstructor_defaultBun_2]').should('be.visible');
    });
});