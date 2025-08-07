import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET book by ID - Positive', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/Books/1`);
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Assertions
  expect(body.id).toBe(1);
  expect(body).toHaveProperty('title');

  // Display the book details
  console.log('Book details:', body);
});
