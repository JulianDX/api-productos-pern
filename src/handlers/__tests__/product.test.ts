import request from "supertest";
import server from "../../server";

describe("POST /api", () => {
  it("Should create a new Product and return 201", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Testing",
      price: 89,
    });
    expect(res.status).toBe(201);
  });
  it("Should return a 400 error when sending an empty body to the create uri", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toBe(400);
  });
  it("Should return a 400 error when sending a price equals to zero or lower", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Tes",
      price: 0,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual(
      "El precio debe ser mayor o igual a cero"
    );
  });
});

describe("GET /api/products", () => {
  it("Get all products", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
  });
});
