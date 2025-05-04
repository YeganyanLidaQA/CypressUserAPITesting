describe("User CRUD operations", () => {
  let data;

  before(() => {
    cy.fixture("BodyData.json").then((jsonData) => {
      jsonData.auth.email = `lidayeganyan${Date.now()}@gmail.com`;
      jsonData.updatedData.email = `updated_lidayeganyan${Date.now()}@gmail.com`;
      data = jsonData;
    });
  });

  it("Create, Verify and Update user", () => {
    cy.request({
      method: "POST",
      url: "users",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
        "Content-Type": "application/json",
      },
      body: data.auth,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(data.auth);
      expect(response.body).to.have.property("id");

      const userId = response.body.id;
      Cypress.env("userId", userId);

      cy.request({
        method: "GET",
        url: `users/${userId}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(data.auth);

        cy.request({
          method: "PATCH",
          url: `users/${userId}`,
          headers: {
            Authorization: `Bearer ${Cypress.env("token")}`,
            "Content-Type": "application/json",
          },
          body: data.updatedData,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.include(data.updatedData);
        });

        cy.request({
          method: "DELETE",
          url: `users/${userId}`,
          headers: {
            Authorization: `Bearer ${Cypress.env("token")}`,
          },
        }).then(() => {
          cy.request({
            method: "GET",
            url: `users/${userId}`,
            headers: {
              Authorization: `Bearer ${Cypress.env("token")}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(404);
          });
        });
      });
    });
  });
});
