import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../ultils/server";
const User = require("../models/user");

const app = createServer();

const userInput = {
  email: "test@example.com",
  password: "password",
  firstname: "John",
  lastname: "Doe",
  mobile: "123456789",
};

describe.only("user", () => {
  // user registration
  describe("user registration", () => {
    describe.only("given the email is empty", () => {
      it("should return the message Missing input", async () => {
        const testCases = [
          {
            email: "",
            firstname: "John",
            lastname: "Doe",
            password: "password",
          }, // Missing email
          {
            email: "test@example.com",
            firstname: "",
            lastname: "Doe",
            password: "password",
          }, // Missing firstname
          {
            email: "test@example.com",
            firstname: "John",
            lastname: "",
            password: "password",
          }, // Missing lastname
          {
            email: "test@example.com",
            firstname: "John",
            lastname: "Doe",
            password: "",
          }, // Missing password
        ];
        for (const testCase of testCases) {
          const { statusCode, body } = await supertest(app)
            .post("/api/user/register")
            .send(testCase);

          expect(statusCode).toBe(400);
          expect(body.success).toBe(false);
          expect(body.mes).toBe("Missing input");
        }
      });
    });

    describe.only("given the email has existed", () => {
      it("should return the message User has existed", async () => {
        // Mocking dependencies
        jest.spyOn(User, "findOne").mockResolvedValue({}); // Mocking that user exists
        jest.spyOn(User, "create").mockResolvedValue({}); // Mocking successful user creation
        jest.spyOn(global, "setTimeout").mockImplementation((cb) => cb()); // Mocking setTimeout

        // Make the request
        const { statusCode, body } = await supertest(app)
          .post("/api/user/register")
          .send(userInput);

        // Assert the response status code
        expect(statusCode).toBe(500);

        // Assert the response body
        expect(body.success).toBe(false);
        expect(body.mes).toBe("User has existed");
      });
    });

    describe("given the email is valid", () => {
      it.only("should return the message success", async () => {
        // Mocking dependencies
        jest.spyOn(User, "findOne").mockResolvedValue(null); // Mocking that user exists
        jest.spyOn(User, "create").mockResolvedValue({}); // Mocking successful user creation
        const userInput2 = {
          email: "tese23323t@example22.com",
          password: "password",
          firstname: "John",
          lastname: "Doe",
          mobile: "123422487",
        };
        // Make the request
        const { statusCode, body } = await supertest(app)
          .post("/api/user/register")
          .send(userInput2);

        expect(body.mes).toBe("Please check your email to active account");

        // Assert that User.findOne was called with the correct email
        expect(User.findOne).toHaveBeenCalledWith({ email: userInput2.email });
      });
    });
  });

  describe("user login", () => {
    describe.only("given the email or password is empty", () => {
      it("should return the message Missing input", async () => {
        const testCases = [
          {
            email: "",
            password: "password",
          },
          {
            email: "",
            password: "password",
          },
        ];
        for (const testCase of testCases) {
          const { statusCode, body } = await supertest(app)
            .post("/api/user/login")
            .send(testCase);

          expect(statusCode).toBe(400);
          expect(body.success).toBe(false);
          expect(body.mes).toBe("Missing input");
        }
      });
    });
    describe.only("given the email or password is incorrect", () => {
      it("should return the message Missing input", async () => {
        jest.spyOn(User, "findOne").mockResolvedValue({
          // Mock user data
          _id: "user_id",
          isCorrectPassword: jest.fn().mockResolvedValue(false),
          toObject: jest.fn().mockReturnValue({
            role: "user",
            // other user data fields
          }),
        });
        jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({}); // Mock successful update

        // Input data
        const userInput = {
          email: "test@example.com",
          password: "password",
        };

        // Make the request
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send(userInput);

        // Assert the response status code
        expect(statusCode).toBe(500);
        expect(body.mes).toBe("Invalid credentials!");
      });
    });
    describe("given the email or password true", () => {
      it.only("should return access token and user data if login is successful", async () => {
        jest.spyOn(User, "findOne").mockResolvedValue({
          // Mock user data
          _id: "user_id",
          isCorrectPassword: jest.fn().mockResolvedValue(true),
          toObject: jest.fn().mockReturnValue({
            role: "user",
          }),
        });
        jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({}); // Mock successful update

        // Input data
        const userInput = {
          email: "test@example.com",
          password: "password",
        };

        // Make the request
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send(userInput);

        // Assert the response status code
        expect(statusCode).toBe(200);

        // Assert the response body
        expect(body.success).toBe(true);
        expect(body.accessToken).toBeDefined();
        expect(body.userData).toBeDefined();

        // Assert that User.findOne was called with the correct email
        expect(User.findOne).toHaveBeenCalledWith({ email: userInput.email });

        // Assert that User.findByIdAndUpdate was called to save refresh token
        expect(User.findByIdAndUpdate).toHaveBeenCalled();
      });
    });
  });
});
