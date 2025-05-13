/// <reference types='cypress' />
describe("Login Validation", () => {
  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/login");
  });

  let username = "TechGlobal";
  let pass = "Test1234";

  it("Test Case 01 - Validate the login form", () => {
    cy.get("label[for='username']").should(
      "have.text",
      "Please enter your username"
    );
    cy.get("input#username")
      .should("be.visible")
      .and("not.have.attr", "required");
    cy.get("label[for='password']").should(
      "have.text",
      "Please enter your password"
    );
    cy.get("input#password")
      .should("be.visible")
      .and("not.have.attr", "required");
    cy.get("#login_btn").should("be.visible").and("have.text", "LOGIN").click();
    cy.get('a[href="/frontend/login"]')
      .should("be.visible")
      .and("have.text", "Forgot Password?")
      .click();
  });

  it("Test Case 02 - Validate the valid login", () => {
    cy.get("#username").type(username);
    cy.get("#password").type(pass);
    cy.get("#login_btn").click();
    cy.get("#success_lgn").should("have.text", "You are logged in");
    cy.get("#logout").should("have.text", "LOGOUT");
  });

  it("Test Case 03 - Validate the logout", () => {
    cy.get("#username").type(username);
    cy.get("#password").type(pass);
    cy.get("#login_btn").click();
    cy.get("#logout").click();
    cy.get(".LoginForm_content__GphXn").should("be.visible");
  });

  it("Test Case 04 - Validate the Forgot Password? Link and Reset Password modal", () => {
    cy.get('a[href="/frontend/login"]').click();
    cy.get("#sub_heading").should("have.text", "Reset Password");
    cy.get('button[aria-label="close"]').should("be.visible");
    cy.get("label[for='email']").should(
      "include.text",
      "Enter your email address and we'll send you a link to reset your password."
    );
    cy.get("#submit").should("be.visible").and("have.text", "SUBMIT").click();
  });

  it("Test Case 05 - Validate the Reset Password modal close button", () => {
    cy.get('a[href="/frontend/login"]').click();
    cy.get('div[class$="is-active"]').should("be.visible");
    cy.get(".delete").click();
    cy.get('div[class$="is-active"]').should("not.exist");
  });

  it("Test Case 06 - Validate the Reset Password form submission", () => {
    cy.get('a[href="/frontend/login"]').click();
    cy.get("#email").type("volkan@gmail.com");
    cy.get("#submit").click();
    cy.get("#confirmation_message").should(
      "have.text",
      "A link to reset your password has been sent to your email address."
    );
  });

  it("Test Case 07 - Validate the invalid login with the empty credentials", () => {
    cy.get("#login_btn").click();
    cy.get("#error_message").should("have.text", "Invalid Username entered!");
  });

  it("Test Case 08 - Validate the invalid login with the wrong username", () => {
    cy.get("#username").type("John");
    cy.get("#password").type(pass);
    cy.get("#login_btn").click();
    cy.get("#error_message").should("have.text", "Invalid Username entered!");
  });

  it("Test Case 09 - Validate the invalid login with the wrong password", () => {
    cy.get("#username").type(username);
    cy.get("#password").type("1234");
    cy.get("#login_btn").click();
    cy.get("#error_message").should("have.text", "Invalid Password entered!");
  });

  it("Test Case 10 - Validate the invalid login with the wrong username and password", () => {
    cy.get("#username").type("John");
    cy.get("#password").type("1234");
    cy.get("#login_btn").click();
    cy.get("#error_message").should("have.text", "Invalid Username entered!");
  });
});
