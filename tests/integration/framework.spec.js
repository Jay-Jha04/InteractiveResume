const request = require("supertest");
const { Framework } = require("../../models/framework");

let server;
let name;

describe("/api/frameworks", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await Framework.remove({});
    await server.close();
  });

  describe("POST /", () => {
    const exec = async () => {
      return await request(server).post("/api/frameworks").send({
        name,
      });
    };

    beforeEach(() => {
      name = "framework1";
    });

    it("should return 400 if name is missing", async () => {
      name = "";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save frameworks if it is valid", async () => {
      const res = await exec();
      const framework = await Framework.find({ name: "framework1" });

      expect(res.status).toBe(200);
      expect(framework).not.toBeNull();
    });

    it("should return frameworks if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "framework1");
    });
  });
});
