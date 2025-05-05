/// <reference types ="cypress"/>

describe("Cypress Advanced Actions", () => {
  beforeEach(() => {
    cy.contains(".card", "Actions").click();
  });

  it("Type and Clear Actions", () => {
    let query = "Apple";

    cy.get("#input_box")
      //.should('exist') is eseless since we have many other assertions
      .and("be.visible")
      .and("be.enabled")
      .and("have.attr", "placeholder", "Enter your message...")
      .and("have.attr", "value", "")
      .type(query)
      .should("have.attr", "value", query)
      .clear()
      .should("have.attr", "value", "")
      .and("be.empty");

    //       cy.get("#input_box") // selector in cypress is a chainable
    //         .then((inputElement) => {
    //           const placeholder = inputElement.attr("Placeholder");
    //           //        expect(placeholder).to.include('Enter');
    //           //
    //           //        inputElement.val('TechGlobal');
    //           //        expect(inputElement.val()).eq('TechGlobal')

    //           cy.log(placeholder);

    //           cy.wrap(inputElement); // cypress chainable and wrap truns in to cypress format
    //         });
  });
  it("Right-Click and Double-Click", () => {
    cy.get("#right-click").rightclick();
    cy.get("#right_click_result")
      .should("be.visible")
      .and("have.text", "You right-clicked on a button!");

    cy.get("#double-click").dblclick();
    cy.get("#double_click_result")
      .should("be.visible")
      .and("have.text", "You double-clicked on a button!");
  });

  it("Drag and Drop", () => {
    cy.get("#drag_element").drag("#drop_element"); // requires 4tw/cypress-drag-drop dependency
    cy.get("#drag_and_drop_result")
      .should("be.visible")
      .and("have.text", "An element dropped here!");
  });

  it('Hover Over', () => {
    // cy.get('#dropdown-testing').trigger('mouseover'); // does not work and requires cypress-real-events dependency
    cy.get('#dropdown-testing').realHover();
    cy.get('#backend-option').click();
    cy.url().should('include', 'backend');

    // cy.on() here is used to listen if we get any "uncaught:exception"
    // and ignore it by returning false

    cy.on('uncaught:exception', () => {
      return false
    })
  });
});
