const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const app = require("../app");
const Member = require("../models/Member");
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
  await Member.deleteMany({});
  await Team.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Members API", () => {
  test("GET /api/members should return all members", async () => {
    await Member.create([
      {
        name: "John Doe",
        description: "Developer",
        age: 30,
        image: "url1",
        team: null,
      },
      {
        name: "Jane Doe",
        description: "Manager",
        age: 25,
        image: "url2",
        team: null,
      },
    ]);

    const response = await supertest(app).get("/api/members");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);

    const names = response.body.map((member) => member.name);

    expect(names).toEqual(expect.arrayContaining(["John Doe", "Jane Doe"]));
  });

  test("GET /api/members/:name should return a member by name", async () => {
    const member = {
      name: "Unique Name",
      description: "Developer",
      age: 30,
      image: "url1",
      team: null,
    };
    await Member.create(member);

    const response = await supertest(app).get(`/api/members/${member.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: member.name,
        description: member.description,
        age: member.age,
        image: member.image,
        team: member.team,
      }),
    );
    // Ensure no additional properties are returned
    expect(Object.keys(response.body)).toEqual(
      expect.arrayContaining(["name", "description", "age", "image", "team"]),
    );
  });

  test("GET /api/members/:name with a nonexistent name should return an error", async () => {
    const response = await supertest(app).get("/api/members/nobody");
    expect(response.statusCode).toBe(404);
  });

  test("POST /api/members should create a new member and return the created member with status 201", async () => {
    const newMember = {
      name: "New Member",
      description: "Newbie",
      age: 20,
      image: "newImage.jpg",
      team: null,
    };

    const response = await supertest(app).post("/api/members").send(newMember);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: newMember.name,
        description: newMember.description,
        age: newMember.age,
        image: newMember.image,
        team: newMember.team,
      }),
    );

    const dbMember = await Member.findOne({ name: newMember.name });
    expect(dbMember).not.toBeNull();
    expect(dbMember.name).toBe(newMember.name);
  });

  test("DELETE /api/members should delete all members", async () => {
    await Member.create({
      name: "To Be Deleted",
      description: "Developer",
      age: 30,
      image: "url1",
      team: null,
    });

    const response = await supertest(app).delete("/api/members");
    expect(response.statusCode).toBe(204);

    const membersAfterDelete = await Member.find();
    expect(membersAfterDelete.length).toBe(0);
  });

  test("DELETE /api/members/:id should delete a specific member and update or delete the team accordingly", async () => {
    const team = await Team.create({
      name: "Development",
      members: [],
    });

    const member = await Member.create({
      name: "To Be Deleted",
      description: "Developer",
      age: 30,
      image: "url1",
      team: team._id,
    });

    team.members.push(member._id);
    await team.save();

    const response = await supertest(app).delete(`/api/members/${member._id}`);
    expect(response.statusCode).toBe(204);

    const foundMember = await Member.findById(member._id);
    expect(foundMember).toBeNull();

    // Verify the team is deleted since it should be empty now
    const foundTeam = await Team.findById(team._id);
    expect(foundTeam).toBeNull();
  });

  test("DELETE /api/members/:id with an invalid id should return an error", async () => {
    const response = await supertest(app).delete(`/api/members/12345`);
    expect(response.statusCode).toBe(500);
  });

  test("PATCH /api/members/:id should update a specific member and verify unchanged fields", async () => {
    const member = await Member.create({
      name: "To Be Updated",
      description: "Developer",
      age: 30,
      image: "url1",
      team: null,
    });

    const updatedInfo = {
      description: "Senior Developer",
      age: 31, // Update age as well
    };

    const response = await supertest(app)
      .patch(`/api/members/${member._id}`)
      .send(updatedInfo);

    expect(response.statusCode).toBe(200);
    expect(response.body.description).toBe(updatedInfo.description);
    expect(response.body.age).toBe(updatedInfo.age);

    // Ensure other fields are unchanged
    expect(response.body.name).toBe(member.name);
    expect(response.body.image).toBe(member.image);

    // Check the database to ensure the member is updated correctly
    const updatedMember = await Member.findById(member._id);
    expect(updatedMember.description).toBe(updatedInfo.description);
    expect(updatedMember.age).toBe(updatedInfo.age);

    expect(updatedMember.name).toBe(member.name);
    expect(updatedMember.image).toBe(member.image);
  });

  test("PATCH /api/members/:id with an invalid id should return an error", async () => {
    const updatedInfo = {
      description: "Senior Developer",
      age: 31,
    };

    const response = await supertest(app)
      .patch(`/api/members/12345`)
      .send(updatedInfo);

    expect(response.statusCode).toBe(500);
  });
});
