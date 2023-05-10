import { expect } from "chai";
import request from "supertest";
import app from "..";

describe("POST Create book", () => {
  it("should create book for the user", (done) => {
    request(app)
      .post("/insert")
      .send({ setBookName: "asd", setReview: "asd" })
      .expect(200, done);
  });
});
