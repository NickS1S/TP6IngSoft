describe("Login de Usuario", () => {
  it("Debería iniciar sesión con el usuario registrado", () => {
    cy.fixture('usuario.json').then((user) => {
      cy.visit("https://thinking-tester-contact-list.herokuapp.com/");

      cy.get('#email').type(user.email);
      cy.get('#password').type("12345678");
      cy.get('#submit').click();

      cy.contains("Contact List").should("be.visible");
    });
  });

  it("No debería iniciar sesión si faltan campos obligatorios", () => {
    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");

    // Caso 1: falta contraseña
    cy.get('#email').type("usuario@test.com");
    cy.get('#submit').click();
    cy.contains("Incorrect username or password").should("be.visible");

    // Caso 2: falta email
    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.get('#password').type("12345678");
    cy.get('#submit').click();
    cy.contains("Incorrect username or password").should("be.visible");
  });

  // 1) Contraseña incorrecta
it("No debería iniciar sesión con contraseña incorrecta", () => {
  cy.fixture("usuario.json").then(({ email }) => {
    const WEB = "https://thinking-tester-contact-list.herokuapp.com/";

    cy.visit(WEB);
    cy.get("#email").type(email);
    cy.get("#password").type("wrongpass");
    cy.get("#submit").click();

    cy.contains(/Incorrect username or password/i, { timeout: 8000 }).should("be.visible");
    cy.url().should("eq", WEB);               // sigue en login
    cy.get("#email").should("be.visible");    // form presente
    cy.contains(/logout/i).should("not.exist"); // no hay logout
  });
});

// 2) Usuario no registrado
it("No debería iniciar sesión con usuario no registrado", () => {
  const WEB = "https://thinking-tester-contact-list.herokuapp.com/";
  const fakeEmail = `no_reg_${Date.now()}@mail.com`;

  cy.visit(WEB);
  cy.get("#email").type(fakeEmail);
  cy.get("#password").type("12345678");
  cy.get("#submit").click();

  cy.contains(/Incorrect username or password/i, { timeout: 8000 }).should("be.visible");
  cy.url().should("eq", WEB);
  cy.get("#email").should("be.visible");
  cy.contains(/logout/i).should("not.exist");
});


  // 3) Login enviando con Enter
  it("Debería iniciar sesión al presionar Enter en la contraseña", () => {
    cy.fixture("usuario.json").then(({ email }) => {
      cy.visit("https://thinking-tester-contact-list.herokuapp.com/");

      cy.get("#email").type(email);
      cy.get("#password").type("12345678{enter}");

      cy.contains("Contact List").should("be.visible");
    });
  });
});
