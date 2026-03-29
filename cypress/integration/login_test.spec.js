import config from "../../src/config.json";

describe("inloggen van een gebruiker", () => {
  const url = config.url;

  it("should fail login with wrong username", () => {
    cy.visit(`${url}`);
    cy.get("[data-cy=username_input]").type("wrong username");
    cy.get("[data-cy=password_input]").type("f");
    cy.get("[data-cy=submit_btn]").click();

    cy.get("[data-cy=login_failed]").should("be.visible");
    cy.get("[data-cy=login_failed]").contains(
      "Uw gebruikersnaam en/of wachtwoord komen niet overeen."
    );
  });

  it("should fail login with wrong password", () => {
    cy.visit(`${url}`);
    cy.get("[data-cy=username_input]").type("f");
    cy.get("[data-cy=password_input").type("wrong password");
    cy.get("[data-cy=submit_btn").click();

    cy.get("[data-cy=login_failed]").should("be.visible");
    cy.get("[data-cy=login_failed]").contains(
      "Uw gebruikersnaam en/of wachtwoord komen niet overeen."
    );
  });

  it("should fail login with wrong details", () => {
    cy.visit(`${url}`);
    cy.get("[data-cy=username_input]").type("wrong username");
    cy.get("[data-cy=password_input").type("wrong password");
    cy.get("[data-cy=submit_btn").click();

    cy.get("[data-cy=login_failed]").should("be.visible");
    cy.get("[data-cy=login_failed]").contains(
      "Uw gebruikersnaam en/of wachtwoord komen niet overeen."
    );
  });

  it("should login correctly", () => {
    cy.visit(`${url}`);
    cy.get("[data-cy=username_input").type("f");
    cy.get("[data-cy=password_input").type("f");
    cy.get("[data-cy=submit_btn").click();

    cy.get("[data-cy=dashboard_item]").eq(0).contains("Economie");
    cy.get("[data-cy=dashboard_item").should("have.length", 4);
  });
});
