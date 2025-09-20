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

 // ===  email duplicado ===
  it("No debería permitir registrar un usuario con email ya existente", () => {
    const WEB = "https://thinking-tester-contact-list.herokuapp.com/";
    const usuarioEmail = `nico_dup_${Date.now()}@mail.com`;
    const pass = "12345678";

    // 1) Registro válido
    cy.visit(WEB);
    cy.contains("Sign up").click();

    cy.get("#firstName").type("Nicolas");
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type(usuarioEmail);
    cy.get("#password").type(pass);
    cy.get('button[type="submit"]').click();

    cy.contains("Contact List").should("be.visible");

    // 2) Logout para volver al inicio
    cy.contains("Logout").click();
    cy.url().should("eq", WEB);

    // 3) Intento de registro con el MISMO email (debe fallar)
    cy.contains("Sign up").click();

    cy.get("#firstName").type("Nicolas");
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type(usuarioEmail); // duplicado
    cy.get("#password").type(pass);
    cy.get('button[type="submit"]').click();

    // No debe entrar a Contact List
    cy.contains("Contact List").should("not.exist");

    // Debe quedarse en pantalla de signup / mostrar error
    cy.url().should((url) => {
      expect(url).to.satisfy(
        (u) =>
          u.includes("signup") ||
          u.includes("register") ||
          u.includes("/users") ||
          u.includes("/addUser")
      );
    });

    // Mensaje de error (regex flexible por si el texto cambia)
    cy.contains(/already|exists|email|duplicate|registrado|used/i).should("exist");
  });

  // 4) Email con formato inválido
  it("No debería registrar un usuario con email inválido", () => {
    const WEB = "https://thinking-tester-contact-list.herokuapp.com/";

    cy.visit(WEB);
    cy.contains("Sign up").click();

    cy.get("#firstName").type("Nicolas");
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type("correo-invalido"); // sin @ ni dominio
    cy.get("#password").type("12345678");
    cy.get('button[type="submit"]').click();

    // No debe entrar a Contact List
    cy.contains("Contact List").should("not.exist");

    // Debe quedarse en pantalla de signup / mostrar error
    cy.url().should((url) => {
      expect(url).to.satisfy(
        (u) =>
          u.includes("signup") ||
          u.includes("register") ||
          u.includes("/users") ||
          u.includes("/addUser")
      );
    });

    // Mensaje genérico de validación (flexible)
    cy.contains(/email|correo|invalid|format|válido/i).should("exist");
  });

  // 5) Campo obligatorio faltante (ej: nombre)
  it("No debería registrar si falta un campo obligatorio (firstName)", () => {
    const WEB = "https://thinking-tester-contact-list.herokuapp.com/";
    const usuarioEmail = `nico_req_${Date.now()}@mail.com`;

    cy.visit(WEB);
    cy.contains("Sign up").click();

    // cy.get("#firstName") -> lo dejamos vacío a propósito
    cy.get("#lastName").type("Lopez");
    cy.get("#email").type(usuarioEmail);
    cy.get("#password").type("12345678");
    cy.get('button[type="submit"]').click();

    // No debe entrar a Contact List
    cy.contains("Contact List").should("not.exist");

    // Debe quedarse en pantalla de signup / mostrar error
    cy.url().should((url) => {
      expect(url).to.satisfy(
        (u) =>
          u.includes("signup") ||
          u.includes("register") ||
          u.includes("/users") ||
          u.includes("/addUser")
      );
    });

    // Error por campo requerido (regex amplia para distintas variantes)
    cy.contains(/required|obligatorio|first\s*name|nombre|missing/i).should("exist");
  });

});

