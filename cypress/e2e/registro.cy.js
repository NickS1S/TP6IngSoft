const path = 'cypress/fixtures/usuario.json';

describe("Registro de Usuario", () => {
  it("Debería registrar un nuevo usuario", () => {
    const usuarioEmail = `nicolas${Date.now()}@mail.com`;

    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.contains("Sign up").click();

    cy.get('#firstName').type("Nicolas");
    cy.get('#lastName').type("Lopez");
    cy.get('#email').type(usuarioEmail);
    cy.get('#password').type("12345678");

    cy.get('button[type="submit"]').click();

    cy.contains("Contact List").should("be.visible");

    // Guardar email en archivo fixture dentro del mismo scope
    cy.writeFile(path, { email: usuarioEmail });
  });
});
