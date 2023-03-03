const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = require("../app");
const { User } = require("../models");
const { DB_HOST, PORT } = process.env;

describe("test login route", () => {
  let server;

  beforeAll(() => {
    server = app.listen(PORT);
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_HOST);
  });

  afterAll(() => {
    mongoose.disconnect();
    server.close();
  });

  test("test login with wrong password", async () => {
    const response = await request(server)
      .post("/users/login")
      .send({
        email: "test@thesimpsons.dev",
        password: "any_wrong_password",
      });

    expect(response.status).toBe(401);
  });

  test("test login user doesn't exist", async () => {
    const response = await request(server)
      .post("/users/login")
      .send({
        email: "any_unknown@thesimpsons.dev",
        password: "any_wrong_password",
      });

    expect(response.status).toBe(401);
  });

  test("test successfull login", async () => {
    const response = await request(server)
      .post("/users/login")
      .send({
        email: "test@thesimpsons.dev",
        password: "1234567",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(typeof response.body.token).toBe(
      "string"
    );

    const user = response.body.user;
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("avatar");
    expect(user).toHaveProperty("subscription");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.avatar).toBe("string");
    expect(typeof user.subscription).toBe(
      "string"
    );
  });
});
