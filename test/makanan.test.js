import {
  createManyTestMakanans,
  createTestMakanan,
  createTestUser,
  getTestMakanan,
  removeAllTestMakanans,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/makanans", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestMakanans();
    await removeTestUser();
  });

  it("should can create new makanan", async () => {
    const result = await supertest(web)
      .post("/api/makanans")
      .set("Authorization", "test")
      .send({
        makanan: "test",
        minuman: "test",
        paket_murah: "test",
        aneka_salad: "test",
        jumlah: "test",
        harga: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.makanan).toBe("test");
    expect(result.body.data.minuman).toBe("test");
    expect(result.body.data.paket_murah).toBe("test");
    expect(result.body.data.aneka_salad).toBe("test");
    expect(result.body.data.jumlah).toBe("test");
    expect(result.body.data.harga).toBe("test");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/makanans")
      .set("Authorization", "test")
      .send({
        makanan: "",
        minuman: "test",
        paket_murah: "test",
        aneka_salad: "test",
        jumlah: "test",
        harga: "test",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/makanans/:makananId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestMakanan();
  });

  afterEach(async () => {
    await removeAllTestMakanans();
    await removeTestUser();
  });

  it("should can get makanan", async () => {
    const testmakanan = await getTestMakanan();

    const result = await supertest(web)
      .get("/api/makanans/" + testmakanan.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testmakanan.id);
    expect(result.body.data.makanan).toBe(testmakanan.makanan);
    expect(result.body.data.minuman).toBe(testmakanan.minuman);
    expect(result.body.data.paket_murah).toBe(testmakanan.paket_murah);
    expect(result.body.data.aneka_salad).toBe(testmakanan.aneka_salad);
    expect(result.body.data.jumlah).toBe(testmakanan.jumlah);
    expect(result.body.data.harga).toBe(testmakanan.harga);
  });

  it("should return 404 if makanan id is not found", async () => {
    const testmakanan = await getTestMakanan();

    const result = await supertest(web)
      .get("/api/makanans/" + (testmakanan.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/makanans/:makananId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestMakanan();
  });

  afterEach(async () => {
    await removeAllTestMakanans();
    await removeTestUser();
  });

  it("should can update existing makanan", async () => {
    const testmakanan = await getTestMakanan();

    const result = await supertest(web)
      .put("/api/makanans/" + testmakanan.id)
      .set("Authorization", "test")
      .send({
        makanan: "iga bakar",
        minuman: "jus jambu",
        paket_murah: "kelaurga 1",
        aneka_salad: "salad buah",
        jumlah: "12",
        harga: "150.000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testmakanan.id);
    expect(result.body.data.makanan).toBe("iga bakar");
    expect(result.body.data.minuman).toBe("jus jambu");
    expect(result.body.data.paket_murah).toBe("keluarga 1");
    expect(result.body.data.aneka_salad).toBe("salad buah");
    expect(result.body.data.jumlah).toBe("12");
    expect(result.body.data.harga).toBe("150.000");
  });

  it("should reject if request is invalid", async () => {
    const testmakanan = await getTestMakanan();

    const result = await supertest(web)
      .put("/api/makanans/" + testmakanan.id)
      .set("Authorization", "test")
      .send({
        makanan: "",
        minuman: "",
        paket_murah: "",
        aneka_salad: "",
        jumlah: "",
        harga: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if makanan is not found", async () => {
    const testmakanan = await getTestMakanan();

    const result = await supertest(web)
      .put("/api/makanans/" + (testmakanan.id + 1))
      .set("Authorization", "test")
      .send({
        makanan: "iga bakar",
        minuman: "jus jambu",
        paket_murah: "keluarga 1",
        aneka_salad: "salad buah",
        jumlah: "12",
        harga: "150.000",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/makanans/:makananId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestMakanan();
  });

  afterEach(async () => {
    await removeAllTestMakanans();
    await removeTestUser();
  });

  it("should can delete makanan", async () => {
    let testmakanan = await getTestMakanan();
    const result = await supertest(web)
      .delete("/api/makanans/" + testmakanan.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testmakanan = await getTestMakanan();
    expect(testmakanan).toBeNull();
  });

  it("should reject if makanan is not found", async () => {
    let testmakanan = await getTestMakanan();
    const result = await supertest(web)
      .delete("/api/makanans/" + (testmakanan.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/makanans", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestMakanans();
  });

  afterEach(async () => {
    await removeAllTestMakanans();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/makanans")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/makanans")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using makanan", async () => {
    const result = await supertest(web)
      .get("/api/makanans")
      .query({
        makanan: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using aneka_salad", async () => {
    const result = await supertest(web)
      .get("/api/makanans")
      .query({
        aneka_salad: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using jumlah", async () => {
    const result = await supertest(web)
      .get("/api/makanans")
      .query({
        jumlah: "12",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(8);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
