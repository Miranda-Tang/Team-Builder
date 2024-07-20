const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const app = require("../app");
const Team = require("../models/Team");

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await Team.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Teams API", () => {
  test("POST /teams creates a new team", async () => {
    const teamData = { name: "Development Team", members: [] };
    const response = await supertest(app).post("/api/teams").send(teamData);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(teamData.name);
    expect(Array.isArray(response.body.members)).toBe(true);
    expect(response.body.members.length).toBe(0);
  });

  test("GET /teams/:id returns a team by ID", async () => {
    const team = new Team({ name: "Development Team", members: [] });
    await team.save();

    const response = await supertest(app).get(`/api/teams/${team._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(team.name);
    expect(Array.isArray(response.body.members)).toBe(true);
  });

  test("GET /api/teams/:id with an invalid id should return an error", async () => {
    const response = await supertest(app).get(`/api/teams/12345`);
    expect(response.statusCode).toBe(500);
  });
});
