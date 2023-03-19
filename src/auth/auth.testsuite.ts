require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import request from "supertest";

import sequelize from "../utils/configs/database";
import app from "../routes";

export const authTest = () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  describe("Feature - Register", () => {
    test("should return success response with valid body request", async () => {
      const res = await request(app).post("/api/v1/register").send({
        username: "testing",
        password: "test",
        first_name: "Yoga S",
        last_name: "Devanada",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("User registered");
    });

    test("should return failed response when account already exist", async () => {
      const res = await request(app).post("/api/v1/register").send({
        username: "testing",
        password: "test",
        first_name: "Yoga S",
        last_name: "Devanada",
      });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe("User already exist, please login");
    });

    test("should return failed response when some of body request is missing", async () => {
      const res = await request(app).post("/api/v1/register").send({
        username: "testing",
        password: "test",
        first_name: "Yoga S",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("All input is required");
    });
  });

  describe("Feature - Login", () => {
    test("should return success response with valid credential", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "testing",
        password: "test",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Login successfully");
    });

    test("should return failed response with invalid password", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "testing",
        password: "test!",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid password");
    });

    test("should return failed response with invalid username", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "testingabc",
        password: "test",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid username");
    });

    test("should return failed response with username is missing", async () => {
      const res = await request(app).post("/api/v1/login").send({
        password: "test",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Username is required");
    });

    test("should return failed response with password is missing", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "testing",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Password is required");
    });

    test("should return failed response with missing request body", async () => {
      const res = await request(app).post("/api/v1/login").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("All input is required");
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};
