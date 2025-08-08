import { test, expect } from "@playwright/test";
import { BASE_URL, HEADERS, TEST_BOOK, INVALID_BOOK } from "../config/secrets";

test.describe("📘 Book API - Positive Tests", () => {
  test("GET /Books → should return all books", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Books`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log("📚 List of All Books:");
    body.forEach((book: any, index: number) => {
      console.log(
        `${index + 1}. ID: ${book.id}, Title: ${book.title}, Description: ${
          book.description
        }`
      );
    });

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("GET /Books/1 → should return book with ID 1", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Books/1`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty("title");
    console.log("📖 Book details:", body);
  });

  test("POST /Books → should create a new book with valid data", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/Books`, {
      headers: HEADERS,
      data: TEST_BOOK,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe(TEST_BOOK.title);
    console.log("✅ Created Book:", body);
  });

  test("GET /Books/1 → should match expected book schema", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/Books/1`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        pageCount: expect.any(Number),
        excerpt: expect.any(String),
        publishDate: expect.any(String),
      })
    );

    console.log("✅ Valid book structure confirmed.");
  });

  test("GET /Books → should check for books with long descriptions", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/Books`);
    expect(response.status()).toBe(200);

    const books = await response.json();
    const longDescBooks = books.filter(
      (book: any) => book.description && book.description.length >= 10000
    );

    if (longDescBooks.length > 0) {
      console.log(
        `📄 Found ${longDescBooks.length} book(s) with long descriptions:`
      );
      longDescBooks.forEach((book: any, index: number) => {
        console.log(`  ${index + 1}. Title: ${book.title}`);
        console.log(`     Description Length: ${book.description.length}`);
        console.log(`     ID: ${book.id}`);
        console.log("     ---");
      });
    } else {
      console.log("✅ No books with long descriptions detected.");
    }
  });
});

test.describe("🎯 Activities API - Positive Tests", () => {
  // 📝 Description: Fetches all activities and ensures correct structure and data.
  test("GET /Activities → should return all activities", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/Activities`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("title");

    console.log("🎯 Sample Activities:", body.slice(0, 3));
  });
});

test.describe("🚫 Book API - Negative Tests", () => {
  test("GET /Books/:invalidId → should return 404 for non-existent book", async ({
    request,
  }) => {
    const invalidId = 999999;
    const response = await request.get(`${BASE_URL}/Books/${invalidId}`);
    expect(response.status()).toBe(404);

    const body = await response.text();
    console.log(`❌ Invalid ID ${invalidId} response:`, body);
    expect(body.toLowerCase()).toContain("not found");
  });

  test("POST /Books → should fail with invalid payload", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/Books`, {
      headers: HEADERS,
      data: INVALID_BOOK,
    });

    const body = await response.json();
    console.log("❌ Invalid payload response body:", body);
    expect([400, 500]).toContain(response.status());
  });
});
