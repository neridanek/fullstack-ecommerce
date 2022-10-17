describe("The Home Page", () => {
  beforeEach(() => {});

  it("successfully loads", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("input[name=login]").type("asd");
    cy.get("input[name=password]").type("asd");
    cy.get("button[name=button]").click({ force: true });
    cy.request({
      method: "POST",
      url: "http://localhost:3000/login",
      body: {
        email: "asd",
        password: "asd",
      },
    }).then((res: any) => {
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify(res.accessToken)
      );
      window.localStorage.setItem(
        "refreshToken",
        JSON.stringify(res.refreshToken)
      );
    });
  });
});
