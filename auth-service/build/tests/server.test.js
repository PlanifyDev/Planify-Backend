"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("Integration test", () => {
    const client = (0, supertest_1.default)(server_1.default);
    const email = "mosta148999@gmail.com";
    const firstname = "mostafa";
    const lastname = "ahmed";
    const password = "12345678";
    let user_id, jwt;
    it("Server is running", () => __awaiter(void 0, void 0, void 0, function* () {
        client.get("/test").expect(200);
    }));
    it("Signs up a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client
            .post("/signup")
            .send({
            firstname,
            lastname,
            email,
            password,
        })
            .expect(200);
        expect(result.body.jwt).toBeDefined();
        jwt = result.body.jwt;
    }));
    it("fails signup without required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .post("/signup")
            .send({
            firstname,
            lastname,
        })
            .expect(400);
    }));
    it("fails signup with invalid data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client
            .post("/signup")
            .send({
            firstname,
            lastname,
            email: "mosatfa",
            password: "123",
        })
            .expect(400);
    }));
    it("verify email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client.get(`/verify/?key=${jwt}`); //.expect(200);
    }));
    it("can sign in with email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client
            .post("/signin")
            .send({ email, password })
            .expect(200);
        expect(result.body.jwt).toBeDefined();
        jwt = result.body.jwt;
        user_id = result.body.user.id;
    }));
    it("sign in with wrong data", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client
            .post("/signin")
            .send({ email, password: "115649848964654" })
            .expect(403);
    }));
    it(" update user data with old password", () => __awaiter(void 0, void 0, void 0, function* () {
        const newData = {
            firstname: "new name1",
            lastname: "new name2",
            password: "87654321",
            oldPassword: "12345678",
        };
        const result = client
            .put(`/updateall/${user_id}`)
            .set("authorization", jwt)
            .send(newData)
            .expect(200);
    }));
    it(" update user data with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const newData = {
            firstname: "new name1",
            lastname: "new name2",
            password: "87654321",
            oldPassword: "wrongPassword",
        };
        const result = client
            .put(`/updateall/${user_id}`)
            .set("authorization", jwt)
            .send(newData)
            .expect(400);
    }));
    it(" delete user after all these operation ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client
            .delete(`/deleteuser/${user_id}`)
            .set("authorization", jwt)
            .expect(200);
    }));
});
//# sourceMappingURL=server.test.js.map