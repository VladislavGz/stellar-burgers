import type {} from 'cypress';

describe('Application', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:5173/');
    });
});