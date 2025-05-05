/// <reference types ="cypress"/>

describe("Cypress Homework 1", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/form-elements");
  });

  it("Test Case 01 - Validate the Contact Us information", () => {
    cy.get(".mb-5 > .is-size-3")
      .should("be.visible")
      .and("have.text", "Contact Us");

    cy.get("#address")
      .should("be.visible")
      .and("have.text", "2800 S River Rd Suite 310, Des Plaines, IL 60018");

    cy.get("#email")
      .should("be.visible")
      .and("have.text", "info@techglobalschool.com");

    cy.get("#phone-number")
      .should("be.visible")
      .and("have.text", "(224) 580-2150");
  });

  it("Test Case 02 - Validate the Full name input box", () => {
    cy.get('label[for="name"]')
      .should("be.visible")
      .and("have.text", "Full name *");
    cy.get('input[placeholder="Enter your full name"]')
      .should("be.visible")
      .and("have.attr", "required");
  });

  it("Test Case 03 - Validate the Gender radio button", () => {
    cy.get(".control > .label")
      .should("be.visible")
      .and("have.text", "Gender *");

      cy.get('input[name="question"], input[class="mr-1"]').should('have.attr', 'required')
  });
});
