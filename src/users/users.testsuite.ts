require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import request from "supertest";
import fs from "fs";

import sequelize from "../utils/configs/database";
import app from "../routes";

export const usersTest = () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  describe("Feature - Users (GET)", () => {
    let token: string = "";

    beforeEach(async () => {
      const result = await request(app).post("/api/v1/login").send({
        email: "test@mail.com",
        password: "test",
      });
      token = result.body.data.token;
    });

    test("should return success response with valid authorization", async () => {
      const res = await request(app)
        .get("/api/v1/profile")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User found");
    });

    test("should return failed response without valid authorization", async () => {
      const res = await request(app)
        .get("/api/v1/profile")
        .set("Authorization", `Bearer aabbccddeeffgghhiijjkkll`);
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid Token");
    });

    test("should return failed response without authorization", async () => {
      const res = await request(app).get("/api/v1/profile");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("A token is required for authentication");
    });
  });

  describe("Feature - Users (PUT)", () => {
    let token: string = "";

    beforeEach(async () => {
      const result = await request(app).post("/api/v1/login").send({
        email: "test@mail.com",
        password: "test",
      });
      token = result.body.data.token;
    });

    test("should return success response with valid authorization and valid body request", async () => {
      const res = await request(app)
        .put("/api/v1/profile")
        .set("Authorization", `Bearer ${token}`)
        .field("first_name", "Test Update")
        .attach("image", fs.readFileSync("src/utils/tests/image.png"));
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User updated successfully");
    });

    test("should return failed response without valid authorization", async () => {
      const res = await request(app)
        .put("/api/v1/profile")
        .set("Authorization", `Bearer aabbccddeeffgghhiijjkkll`)
        .field("first_name", "Test Update")
        .attach("image", fs.readFileSync("src/utils/tests/image.png"));
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid Token");
    });

    test("should return failed response without authorization", async () => {
      const res = await request(app)
        .put("/api/v1/profile")
        .field("first_name", "Test Update")
        .attach("image", fs.readFileSync("src/utils/tests/image.png"));
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("A token is required for authentication");
    });
  });

  describe("Feature - Users (DELETE)", () => {
    let token: string = "";

    beforeAll(async () => {
      const result = await request(app).post("/api/v1/login").send({
        email: "test@mail.com",
        password: "test",
      });
      token = result.body.data?.token;
    });

    test("should return failed response without valid authorization", async () => {
      const res = await request(app)
        .delete("/api/v1/profile")
        .set("Authorization", `Bearer aabbccddeeffgghhiijjkkll`);
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid Token");
    });

    test("should return failed response without authorization", async () => {
      const res = await request(app).delete("/api/v1/profile");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("A token is required for authentication");
    });

    test("should return success response with valid authorization", async () => {
      const res = await request(app)
        .delete("/api/v1/profile")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User deleted successfully");
    });

    test("should return failed response with valid authorization when account already deleted", async () => {
      const res = await request(app)
        .delete("/api/v1/profile")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Failed to delete user, user not found");
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};
