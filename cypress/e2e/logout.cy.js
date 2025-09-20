describe("Cierre de Sesión", () => {
  it("Debería cerrar sesión correctamente", () => {
    cy.fixture('usuario.json').then((user) => {
      // Primero loguearse
      cy.visit("https://thinking-tester-contact-list.herokuapp.com/");

      cy.get('#email').type(user.email);
      cy.get('#password').type("12345678");
      cy.get('#submit').click();

      // Cerrar sesión (asumiendo que el botón tiene texto 'Logout')
      cy.contains("Logout").click();

      // Verificar redirección a la raíz "/"
      cy.url().should("eq", "https://thinking-tester-contact-list.herokuapp.com/");
    });
  });


// 2) Tras cerrar sesión, permanece deslogueado al recargar
it("Debería permanecer deslogueado después de recargar la página", () => {
  const WEB = "https://thinking-tester-contact-list.herokuapp.com/";

  cy.fixture("usuario.json").then(({ email }) => {
    // Login
    cy.visit(WEB);
    cy.get("#email").type(email);
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    cy.contains(/logout/i).should("be.visible");

    // Logout
    cy.contains(/logout/i).click();

    // Vuelve al login y no hay logout
    cy.url().should("eq", WEB);
    cy.get("#email").should("be.visible");
    cy.contains(/logout/i).should("not.exist");

    // Recargar y seguir deslogueado
    cy.reload();
    cy.get("#email").should("be.visible");
    cy.contains(/logout/i).should("not.exist");
  });
});

});
