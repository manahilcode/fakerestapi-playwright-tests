import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET all books - Positive', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/Books`);
  expect(response.status()).toBe(200);

  const body = await response.json();

  //Output the list of all books
  console.log('📚 List of All Books:');
  body.forEach((book: any, index: number) => {
    console.log(`${index + 1}. ID: ${book.id}, Title: ${book.title}, Description: ${book.description}`);
  });

  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
