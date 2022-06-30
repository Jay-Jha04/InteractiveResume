const request = require("supertest");
const { Profile } = require("../../models/profile");

let server;
let first_name;
let about_yourself;

describe("/api/profiles", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await Profile.remove({});
    await server.close();
  });

  describe("POST /", () => {
    const exec = async () => {
      return await request(server).post("/api/profiles").send({
        first_name,
        last_name: "last",
        location: "location",
        about_yourself,
      });
    };

    beforeEach(() => {
      first_name = "first";
      about_yourself = "I am testing end point";
    });

    it("should return 400 if first_name is missing", async () => {
      first_name = "";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if about_yourself is more than 1000 words", async () => {
      about_yourself = new Array(1002).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the profile if it is valid", async () => {
      const res = await exec();
      const profile = await Profile.find({ first_name: "first" });

      expect(res.status).toBe(200);
      expect(profile).not.toBeNull();
    });

    it("should return the profile if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("first_name", "first");
    });
  });
});
