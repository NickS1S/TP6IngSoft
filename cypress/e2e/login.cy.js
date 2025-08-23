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

});
