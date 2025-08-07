import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET book - Validate response structure', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/Books/1`);
  expect(response.status()).toBe(200); // Ensure API returns success

  const body = await response.json();

  // Validate expected fields in the response body
  expect(body).toEqual(expect.objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String),
    pageCount: expect.any(Number),
    excerpt: expect.any(String),
    publishDate: expect.any(String),
  }));

  console.log("✅ Valid book structure");
});
