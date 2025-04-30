describe("Cypress Selectors", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/html-elements");
  });

  it("Validate Facebook Link", () => {
    cy.get("#facebook_link").should("be.visible");
  });


  it("Pseudo Class", () => {
    cy.get('#ordered_list > li:first-child')
    cy.get('#ordered_list > li:last-child')
    cy.get('#ordered_list > li:nth-child(2)')

    cy.get('#microsoft_check input').check()
    cy.get('input:checked') //  = .sould('be.checked')


    cy.get('input:not(#checkbox_1') // it will look all except checkbox 1
    
  })
});
