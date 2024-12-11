// import mongoose from "mongoose";
// import supertest from "supertest";
// import createServer from "../ultils/server";
// const User = require("../models/user");

// const app = createServer();

// const userInputAddress = {
//   email: "test1355@example.com",
//   password: "password",
//   firstname: "John",
//   lastname: "Doe",
//   mobile: "123456053",
//   // Thêm các thông tin khác của người dùng nếu cần
//   address: [
//     {
//       id: new mongoose.Types.ObjectId().toString(),
//       city: "Test City",
//       district: "Test District",
//       ward: "Test Ward",
//       addressDetail: "Test Address Detail",
//       defaultAddress: true,
//       name: "Test User",
//       phone: "123456789",
//     },
//   ],
// };
// const userInputAddressFirst = {
//   email: "test13335@example.com",
//   password: "password",
//   firstname: "John",
//   lastname: "Doe",
//   mobile: "123450798",
// };

// describe.only("user", () => {
//   // user registration

//   describe("add new address user", () => {
//     let userId;
//     let accessToken;

//     beforeAll(async () => {
//       const newUser = await User.create(userInputAddressFirst);
//       if (!newUser || !newUser._id) {
//         throw new Error("Failed to create a new user");
//       }
//       userId = newUser._id;

//       // Đăng nhập người dùng và nhận accessToken để thực hiện các yêu cầu có đăng nhập
//       const loginResponse = await supertest(app).post("/api/user/login").send({
//         email: "test13335@example.com",
//         password: "password",
//       });

//       accessToken = loginResponse.body.accessToken;
//     });

//     afterAll(async () => {
//       // Xóa người dùng đã tạo sau khi hoàn thành các bài kiểm tra
//       await User.findByIdAndDelete(userId);
//     });

//     it("should throw an error if city, district, or ward is missing", async () => {
//       const response = await supertest(app)
//         .put("/api/user/add-address")
//         .set("Authorization", `Bearer ${accessToken}`)
//         .send({
//           // Không cung cấp city, district, hoặc ward
//         });

//       expect(response.status).toBe(500); // Kiểm tra rằng phản hồi là lỗi 500
//       expect(response.body.mes).toBe("Missing inputs"); // Kiểm tra rằng thông điệp lỗi đúng
//     });

//     it("should add the first address as default if user has no existing addresses", async () => {
//       const response = await supertest(app)
//         .put("/api/user/add-address")
//         .set("Authorization", `Bearer ${accessToken}`)
//         .send({
//           city: "Test City",
//           district: "Test District",
//           ward: "Test Ward",
//           addressDetail: "Test Address Detail",
//           defaultAddress: true,
//           name: "Test User",
//           phone: "123456789",
//         });

//       expect(response.body.mes).toBe("Update Address is successfully!");
//       expect(response.status).toBe(200);
//       expect(response.body.success).toBe(true);

//       const user = await User.findById(userId);
//       expect(user.address.length).toBe(1);
//     });
//   });

//   describe("update address user", () => {
//     let userId;
//     let accessToken;

//     beforeAll(async () => {
//       // Tạo một người dùng mới để sử dụng trong các bài kiểm tra
//       const newUser = await User.create(userInputAddress);

//       userId = newUser._id;

//       const loginResponse = await supertest(app).post("/api/user/login").send({
//         email: "test1355@example.com",
//         password: "password",
//       });

//       accessToken = loginResponse.body.accessToken;
//     });

//     afterAll(async () => {
//       // Xóa người dùng đã tạo sau khi hoàn thành các bài kiểm tra
//       await User.findByIdAndDelete(userId);
//     });

//     it("should throw an error if no update data provided", async () => {
//       const response = await supertest(app)
//         .put(`/api/user/update-address/${userInputAddress.address[0].id}`)
//         .set("Authorization", `Bearer ${accessToken}`);

//       expect(response.status).toBe(500); // Kiểm tra rằng phản hồi là lỗi 500
//       expect(response.body.mes).toBe("Missing inputs"); // Kiểm tra rằng thông điệp lỗi đúng
//     });

//     it("should update the address successfully", async () => {
//       const response = await supertest(app)
//         .put(`/api/user/update-address/${userInputAddress.address[0].id}`)
//         .set("Authorization", `Bearer ${accessToken}`)
//         .send({
//           city: "Updated City",
//           district: "Test District",
//           ward: "Test Ward",
//           addressDetail: "Test Address Detail",
//           defaultAddress: true,
//           name: "Test User",
//           phone: "123456789",
//         });

//       expect(response.status).toBe(200); // Kiểm tra rằng phản hồi là thành công
//       expect(response.body.success).toBe(true); // Kiểm tra rằng phản hồi có thành công hay không
//       expect(response.body.mes).toBe("Update Address is successfully!"); // Kiểm tra rằng thông điệp thành công đúng
//     });
//   });
// });

/** @format */

export function statisticsWords(str) {
  if (str === "") return {};
  const statisticsWords = {};

  //Reduce
  return str
    .split(" ")
    .filter((word) => word !== "")
    .reduce((statistics, word) => {
      statistics[word] =
        statistics[word] !== undefined ? statistics[word] + 1 : 1;
      return statistics;
    }, {});
}

describe("statisticsWord(str)", () => {
  test("should return empty obj when str is empty", () => {
    expect(statisticsWords("")).toEqual({});
  });
  test("should return correct statistics word when str doesn't have redundant spaces", () => {
    expect(statisticsWords("easy frontend is very easy")).toEqual({
      easy: 2,
      frontend: 1,
      is: 1,
      very: 1,
    });
  });
  test("should return correct statistics word when str  have redundant spaces", () => {
    expect(statisticsWords("easy   frontend    is   very   easy")).toEqual({
      easy: 2,
      frontend: 1,
      is: 1,
      very: 1,
    });
  });
});
