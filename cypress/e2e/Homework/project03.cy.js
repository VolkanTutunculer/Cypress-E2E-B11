/// <reference types='cypress' />

describe("Cypress Homework 3", () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let currentDate = `${month}/${day}/${year}`;
  let writtenDate = date.toDateString();

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);

  let fDay = futureDate.getDate();
  let fMonth = futureDate.getMonth() + 1;
  let fYear = futureDate.getFullYear();

  let futureDateMDY = `${fMonth}/${fDay}/${fYear}`;
  let writtenFutureDate = futureDate.toDateString();

  const labelList = [
    "Trip type",
    "Cabin Class",
    "From",
    "To",
    "Depart",
    "Return",
    "Number of passengers",
    "Passenger 1",
  ];

  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/booking");
  });

  it("Test Case 01 - Validate the default Book your trip form", () => {
    cy.get('input[value="One way"]').should("have.attr", "checked");
    cy.get('input[value="Round trip"]').should("not.have.attr", "checked");

    cy.get(".label")
      .should("be.visible")
      .each((lbl, index) => {
        cy.wrap(lbl).should("have.text", labelList[index]);

        if (lbl.text() === "Number of passengers")
          cy.wrap(lbl).parent().find('option[value="1"]').should("be.selected");
        if (lbl.text() === "Passenger 1")
          cy.wrap(lbl)
            .parent()
            .find("select option:selected")
            .should("have.text", "Adult (16-64)");

        if (lbl.text() === "Depart") {
          cy.wrap(lbl)
            .parent()
            .find(`input[value="${currentDate}"]`)
            .should("be.visible");
        }
        if (lbl.text() === "Return") {
          cy.wrap(lbl)
            .parent()
            .find("input")
            .should("be.visible")
            .and("be.disabled");
        }
      });

    cy.get("div[class='select']").should("be.visible");

    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    cy.get('input[value="Round trip"]').click().should("be.checked");
    cy.get('input[value="One way"]').should("not.be.checked");

    cy.get(".label")
      .should("be.visible")
      .each((lbl, index) => {
        cy.wrap(lbl).should("have.text", labelList[index]);

        if (lbl.text() === "Number of passengers")
          cy.wrap(lbl).parent().find('option[value="1"]').should("be.selected");
        if (lbl.text() === "Passenger 1")
          cy.wrap(lbl)
            .parent()
            .find("select option:selected")
            .should("have.text", "Adult (16-64)");

        if (lbl.text() === "Depart") {
          cy.wrap(lbl)
            .parent()
            .find(`input[value="${currentDate}"]`)
            .should("be.visible");
        }
        if (lbl.text() === "Return") {
          cy.wrap(lbl)
            .parent()
            .find("input")
            .should("not.have.attr", "disabled");
        }
      });

    cy.get("div[class='select']").should("be.visible");

    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  it("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    cy.get('input[value="One way"]').should("have.attr", "checked");
    cy.get('input[value="Round trip"]').should("not.have.attr", "checked");

    cy.contains("label", "Cabin Class")
      .parent()
      .find("select")
      .select("Business");

    cy.contains("label", "From").parent().find("select").select("Illinois");

    cy.contains("label", "To").parent().find("select").select("Florida");

    cy.contains("label", "Depart")
      .parent()
      .find('input[placeholder="MM/DD/YY"]')
      .clear()
      .type(currentDate);

    cy.contains("label", "Number of passengers")
      .parent()
      .find("select")
      .select("1");

    cy.contains("label", "Passenger 1")
      .parent()
      .find("select")
      .select("Senior (65+)");

    cy.get('button[type="submit"]').click();

    const bookingValues = [
      "DEPART",
      "IL to FL",
      "Number of Passengers: 1",
      "Passenger 1: Senior (65+)",
      "Cabin class: Business",
    ];

    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        bookingValues.forEach((expectedText) => {
          expect($book.text()).to.include(expectedText);
        });
      });

    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        expect($book.text()).to.include(writtenDate);
      });
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {
    cy.get('input[value="Round trip"]').click().should("be.checked");
    cy.get('input[value="One way"]').should("not.be.checked");

    cy.contains("label", "Cabin Class").parent().find("select").select("First");

    cy.contains("label", "From").parent().find("select").select("California");

    cy.contains("label", "To").parent().find("select").select("Illinois");

    cy.contains("label", "Depart")
      .parent()
      .find('input[placeholder="MM/DD/YY"]')
      .clear()
      .type(currentDate);

    cy.contains("label", "Return")
      .parent()
      .find('input[placeholder="MM/DD/YY"]')
      .clear()
      .type(futureDateMDY);

    cy.contains("label", "Number of passengers")
      .parent()
      .find("select")
      .select("1");

    cy.contains("label", "Passenger 1")
      .parent()
      .find("select")
      .select("Adult (16-64)");

    cy.get('button[type="submit"]').click();

    const bookingValues = [
      "DEPART",
      "CA to IL",
      "Number of Passengers: 1",
      "Passenger 1: Adult (16-64)",
      "Cabin class: First",
      "RETURN",
      "IL to CA",
    ];

    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        bookingValues.forEach((expectedText) => {
          expect($book.text()).to.include(expectedText);
        });
      });

    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        expect($book.text()).to.include(writtenDate);
      });
    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        expect($book.text()).to.include(writtenFutureDate);
      });
  });

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {
    cy.get('input[value="One way"]').should("have.attr", "checked");
    cy.get('input[value="Round trip"]').should("not.have.attr", "checked");

    cy.contains("label", "Cabin Class")
      .parent()
      .find("select")
      .select("Premium Economy");

    cy.contains("label", "From").parent().find("select").select("New York");

    cy.contains("label", "To").parent().find("select").select("Texas");

    cy.contains("label", "Depart")
      .parent()
      .find('input[placeholder="MM/DD/YY"]')
      .clear()
      .type(currentDate);

    cy.contains("label", "Number of passengers")
      .parent()
      .find("select")
      .select("2");

    cy.contains("label", "Passenger 1")
      .parent()
      .find("select")
      .select("Adult (16-64)");

    cy.contains("label", "Passenger 2")
      .parent()
      .find("select")
      .select("Child (2-11)");

    cy.get('button[type="submit"]').click();

    const bookingValues = [
      "DEPART",
      "NY to TX",
      "Number of Passengers: 2",
      "Passenger 1: Adult (16-64)",
      "Passenger 2: Child (2-11)",
      "Cabin class: Premium Economy",
    ];

    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        bookingValues.forEach((expectedText) => {
          expect($book.text()).to.include(expectedText);
        });
      });
    cy.get(".ml-3")
      .should("be.visible")
      .then(($book) => {
        expect($book.text()).to.include(writtenDate);
      });
  });
});
