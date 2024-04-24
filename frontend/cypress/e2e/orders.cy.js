describe("orders and tickets", () => {
  let ticketsCount = 0;
  let ticketsCount2 = 0;
  it("count ticket", () => {
    cy.visit("http://localhost:5173/tickets");
    cy.get("#input-0").type("margaery");
    cy.get("#input-2").type("tyrell");
    cy.get("#logIn").click();
    (async () => {
      ticketsCount = await countTicket();
    })();
  });
  it("tickets, add order, tickets", () => {
    const userName = "margaery";
    const userSurname = "tyrell";
    const age = 22;
    const start = "wisła";
    const end = "cieszyn";

    cy.visit("http://localhost:5173/order");
    cy.get("#input-0").type("margaery");
    cy.get("#input-2").type("tyrell");
    cy.get("#logIn").click();
    cy.get("#input-7").type(userName);
    cy.get("#input-9").type(userSurname);
    cy.get("#input-11").type(age);
    cy.get("#input-13").type(start);
    cy.get("#input-15").type(end);
    cy.get("#day").click();
    cy.get("#round-trip").click();
    cy.get(".p-inputtext").type("04/07/2023");
    cy.get('.v-col > [type="button"]').click();
    cy.get(".company").first().click();
    cy.get('.v-col > [type="button"]').click();
  });

  it("count ticket", () => {
    cy.visit("http://localhost:5173/tickets");
    cy.get("#input-0").type("margaery");
    cy.get("#input-2").type("tyrell");
    cy.get("#logIn").click();
    (async () => {
      ticketsCount2 = await countTicket();
      expect(ticketsCount2).to.eq(ticketsCount + 1);
    })();
  });
});

function countTicket() {
  return new Cypress.Promise((resolve) => {
    cy.get(".ticket")
      .its("length")
      .then((count) => {
        resolve(count);
      });
  });
}
