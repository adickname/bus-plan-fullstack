describe("login", () => {
  it("login system", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#input-0").type("margaery");
    cy.get("#input-2").type("tyrell");
    cy.get("#logIn").click();
    cy.get(".p-message-text").should("be.visible");
    cy.get("#logOut").should("be.visible").click();
    cy.get("#logIn").should("be.visible");
    cy.get(".p-message-text").should("be.visible");
  });
});
