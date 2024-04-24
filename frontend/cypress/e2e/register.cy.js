describe("login", () => {
  it("register system", () => {
    const userEmail = generateUniqueEmail();
    cy.visit("http://localhost:5173/login");
    cy.get("#input-0").type("margaery");
    cy.get("#input-2").type("tyrell");
    cy.get("#register").click();
    cy.get(".p-message-text").should("be.visible").contains("found same login");
    cy.get("#input-0").type(userEmail);
    cy.get("#input-2").type("tyrell");
    cy.get("#register").click();
    cy.get(".p-message-text").should("be.visible").contains("adding");
    cy.request("DELETE", `${Cypress.env("server_url")}/api/users/`, {
      user: userEmail,
    });
  });
});

function generateUniqueEmail() {
  return "user" + Math.random().toString(36) + "@nieistnieje.cdsdsdsad";
}
