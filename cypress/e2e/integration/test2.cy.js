describe("Cypress Selectors", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/dynamic-elements");
  });

  it("Test Case", () => {
    cy.get("[id *= box_1]").should("be.visible");
    cy.get("[id *= box_2]").should("be.visible"); // contains
    cy.get("[id ^= box_2]").should("be.visible"); // start with
    // cy.get("[id $= box_2]").should("be.visible"); // end with
  });
});

test upload
