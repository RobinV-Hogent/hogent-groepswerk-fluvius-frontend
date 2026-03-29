import config from "../../src/config.json"
describe('Consult category', ()=>{
    beforeEach(()=>{
        cy.login('f', 'f');
    })

    const url = config.url;

    it('should display the details of that sub-csr', ()=>{
        cy.visit(`${url}/category/3`)
        cy.get('[data-cy=dashboard_item]').eq(0).click();
        cy.url().should('include', '/category/3/csr/');
        cy.get('[data-cy=info_card]').contains("Behaalde waarde:")
        cy.get('[data-cy=info_card]').contains("Doelwaarde: ")
        cy.get('[data-cy=graph]').should('exist')

        cy.get('[data-cy=itemList_name]').contains('Datasources')
        cy.get('[data-cy=item_list_items]').should('exist')
        
    })

    it('should display error message if the given csr does not exist', ()=>{
        cy.visit(`${url}/category/3/csr/10`)
       
        cy.get('[data-cy=error_description]').contains(`De data voor deze MVO kon niet worden opgehaald`);
        cy.get('[data-cy=error_title]').contains(`Oei, er is iets misgelopen`);
    })
})