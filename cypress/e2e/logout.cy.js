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
});
