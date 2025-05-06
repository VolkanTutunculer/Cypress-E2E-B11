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

    cy.get('input[name="question"], input[class="mr-1"]').should(
      "have.attr",
      "required"
    );
    cy.get("label.radio").eq(0).should("contain.text", "Male");
    cy.get("label.radio").eq(1).should("contain.text", "Female");
    cy.get("label.radio")
      .eq(2)
      .should("contain.text", "Prefer not to disclose");

    cy.get('input[name="question"]').each(($el) => {
      cy.wrap($el).should("be.visible").and("not.be.checked");
    });

    cy.get("label.radio").eq(0).click();
    cy.get('input[name="question"]').eq(0).should("be.checked");
    cy.get('input[name="question"]').eq(1).should("not.be.checked");
    cy.get('input[name="question"]').eq(2).should("not.be.checked");

    cy.get("label.radio").eq(1).click();
    cy.get('input[name="question"]').eq(1).should("be.checked");
    cy.get('input[name="question"]').eq(0).should("not.be.checked");
    cy.get('input[name="question"]').eq(2).should("not.be.checked");
  });

  it("Test Case 04 - Validate the Address input box", () => {
    cy.get('label[class="label"]').contains("Address").should("be.visible");

    cy.get('input[placeholder="Enter your address"]')
      .should("be.visible")
      .and("not.have.attr", "required");
  });

  it("Test Case 05 - Validate the Email input box", () => {
    cy.get('label[class="label"]').contains("Email *").should("be.visible");

    cy.get('input[type="email"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Enter your email")
      .and("have.attr", "required");
  });

  it("Test Case 06 - Validate the Phone input box", () => {
    cy.get('label[class="label"]').contains("Phone").should("be.visible");

    cy.get('input[type="phone"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Enter your phone number")
      .and("not.have.attr", "required");
  });

  it("Test Case 07 - Validate the Message text area", () => {
    cy.get('label[class="label"]').contains("Message").should("be.visible");

    cy.get('textarea[class="textarea"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Type your message here...")
      .and("not.have.attr", "required");
  });

  it("Test Case 08 - Validate the Consent checkbox", () => {
    cy.get('input[type="checkbox"]')
      .should("be.visible")
      .and("have.attr", "required");

    cy.get('textarea[class="textarea"]').should("be.visible");

    cy.get('label[class="checkbox"]').should(
      "have.text",
      " I give my consent to be contacted."
    );

    cy.get('input[type = "checkbox"]')
      .check()
      .should("be.checked")
      .uncheck()
      .should("not.be.checked");
  });

  it("Test Case 09 - Validate the SUBMIT button", () => {
    cy.get('button[type="submit"]')
      .should("be.visible")
      .should("be.enabled")
      .and("have.text", "SUBMIT");
  });

  it("Test Case 10 - Validate the form submission", () => {
    let fullName = "Volkan Tutunculer";
    let adress = "this is my address";
    let email = "volkan@gmail.com";
    let phone = "123 456 7890";
    let message = "this is my a message for you";

    cy.get('input[placeholder="Enter your full name"]').type(fullName);
    cy.get("label.radio").eq(0).click();
    cy.get('input[placeholder="Enter your address"]').type(adress);
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="phone"]').type(phone);
    cy.get('textarea[class="textarea"]').type(message);
    cy.get('input[type = "checkbox"]').check();
    cy.get('button[type="submit"]').click();
    cy.get('strong[class="mt-5"]')
      .should("be.visible")
      .and("have.text", "Thanks for submitting!");

    cy.on("uncaught:exception", () => {
      return false;
    });

  });
  
});