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
});
