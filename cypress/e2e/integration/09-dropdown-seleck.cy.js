/// <reference types ="cypress"/>

describe("Dropdown Select", () => {
  beforeEach(() => {
    cy.contains(".card", "Dropdowns").click();
  });

  it("Select product & color", () => {
    // cy.get('#product_dropdown')
    //   .select('Apple Watch Series 8')
    //   .should('have.value', 'Apple Watch Series 8');

    // cy.get('#color_dropdown')
    //   .select('Yellow')
    //   .should('have.value', 'Yellow');

    cy.get("#product_dropdown").select("Apple Watch Series 8");
    cy.get("#color_dropdown").select("Yellow");

    cy.get("#product_dropdown option:selected").should(
      "have.text",
      "Apple Watch Series 8"
    );
    cy.get("#color_dropdown option:selected").should("have.text", "Yellow");
  });

  it("Select product & color & delivery", () => {
    cy.get("#product_dropdown option:selected").should(
      "contain.text",
      "Select"
    );
    cy.get("#product_dropdown").select("Apple Watch Series 8");
    cy.get("#product_dropdown option:selected").should(
      "have.text",
      "Apple Watch Series 8"
    );

    cy.get("#color_dropdown option:selected").should("contain.text", "Select");
    cy.get("#color_dropdown").select("Yellow");
    cy.get("#color_dropdown").select("Silver");
    cy.get("#color_dropdown option:selected").should("have.text", "Silver");

    cy.get("#shipment_dropdown").click();
    cy.get('span[aria-label="Delivery"]').click();
  });

  it.only("Validate the result of selections", () => {
    /*
      Select "iPad Pro 11"
      Select "Green"
      Select "Pick up"
      Click on "SUBMIT" button
      Validate "Your Green iPad Pro 11 is ready to be picked up." is visible
    */

    const product = "iPad Pro 11";
    const color = "Green";
    const delivery = "Pick up";
    
const deliveryMessage = delivery === 'Pick up' ? 'is ready to be picked up.': 'will be delivered to you.';

    cy.get("#product_dropdown").select(product);
    cy.get("#color_dropdown").select(color);

    cy.get("#shipment_dropdown").click();
    cy.get('span[aria-label="$(delivery)"').click();
    cy.get("#submit").click();

    const expectedResult = `Your $(color) $(product) $(deliveryMessage)`;

    cy.get(result).should('have.text', expectedResult)
  });
});




