describe("find", () => {
  it("find bus with start and destination", () => {
    cy.visit("http://localhost:5173/find");
    cy.get("#start").click();
    cy.get(".v-list > :nth-child(4)").should("contain", "jaworzynka centrum");
    cy.get(".v-list > :nth-child(4)").click();
    cy.get("#destination").click();
    cy.get(".v-list > :nth-child(4)").should("be.visible");
    cy.get(".v-list > :nth-child(4)").should("contain", "wisła");
    cy.get(".v-list > :nth-child(2)").should("be.visible");
    cy.get(".v-list > :nth-child(2)").should("contain", "cieszyn");
    cy.get(".v-list")
      .children()
      .each(($child) => {
        cy.wrap($child).should("not.contain", "bielsko-biała");
      });
    cy.get(".v-list > :nth-child(4)").click();
    cy.get(".v-col-md-4 > :nth-child(3)").click();
    cy.get(":nth-child(2) > .v-btn").click();
    cy.get(".p-card-title").should("be.visible");
    cy.get(".p-card-title").should("contain", "jaworzynka---cieszyn");
  });
  it("find schedule with start", () => {
    cy.visit("http://localhost:5173/find");
    cy.get("#start").click();
    cy.get(".v-list > :nth-child(4)").should("contain", "jaworzynka centrum");
    cy.get(".v-list > :nth-child(4)").click();
    cy.get(".v-col-md-4 > :nth-child(3)").click();
    cy.get(":nth-child(2) > .v-btn").click();
  });
});
