const request = require("supertest");
 

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request('http://localhost:3200')
      .get("/api/v1/blog")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });


 






})