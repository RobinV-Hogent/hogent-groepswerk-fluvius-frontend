import config from "../../src/config.json"

describe('Consult category', ()=>{
    beforeEach(()=>{
        cy.login('f', 'f');
    })

    const url = config.url;
    it('should display CSRs that belong to that category', ()=>{
        cy.visit(`${url}/categories`)
        cy.get('[data-cy=dashboard_item]').eq(2).click();
        cy.url().should('include', '/category/3');
        cy.get('[data-cy=dashboard_item]').eq(0).contains("Doel:")
        cy.get('[data-cy=dashboard_item]').eq(0).contains("Bereikt:")
    })

    it('should display error message if no CSRs belong to that category', ()=>{
        cy.visit(`${url}/category/2`)
    
        cy.get('[data-cy=error_title]').contains(`Huh, geen doelstellingen?`);
        cy.get('[data-cy=error_description]').contains("We hebben nog geen doelstellingen toevoegd aan deze categorie. Kijk later nog eens!");
    })
})