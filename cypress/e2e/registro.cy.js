const path = "cypress/fixtures/usuario.json";

describe("Registro de Usuario", () => {
  it("Debería registrar un nuevo usuario", () => {
    const usuarioEmail = `nicolas${Date.now()}@mail.com`;

    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.contains("Sign up").click();

    cy.get("#firstName").type("Nicolas");
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type(usuarioEmail);
    cy.get("#password").type("12345678");

    cy.get('button[type="submit"]').click();

    cy.contains("Contact List").should("be.visible");

    // Guardar email en archivo fixture dentro del mismo scope
    cy.writeFile(path, { email: usuarioEmail });
  });

  it("No debería registrar un usuario con contraseña débil", () => {
    const usuarioEmail = `nicolas_badpass${Date.now()}@mail.com`;

    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.contains("Sign up").click();

    cy.get("#firstName").type("Nicolas");
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type(usuarioEmail);
    cy.get("#password").type("123");

    cy.get('button[type="submit"]').click();

    cy.contains("Contact List").should("not.exist");

    cy.url().should((url) => {
      expect(url).to.satisfy(
        (u) =>
          u.includes("signup") ||
          u.includes("register") ||
          u.includes("/users") ||
          u.includes("/addUser")
      );
    });

    cy.contains(
      /error|invalid|contraseña|password|required|mínimo|too short/i
    ).should("exist");
  });
});
