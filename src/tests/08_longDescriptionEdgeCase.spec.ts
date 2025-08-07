import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET books with long description', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/Books`);
  expect(response.status()).toBe(200);

  const books = await response.json();
  const longDescBooks = books.filter((book: any) => book.description && book.description.length >= 10000);

  if (longDescBooks.length > 0) {
    console.log(`📚 Found ${longDescBooks.length} book(s) with long descriptions (>= 10000 chars):`);
    longDescBooks.forEach((book: any, index: number) => {
      console.log(`  ${index + 1}. Title: ${book.title}`);
      console.log(`     Description Length: ${book.description.length}`);
      console.log(`     ID: ${book.id}`);
      console.log('     ---');
    });
  } else {
    console.log("✅ No books with long descriptions detected. Test passed gracefully.");
  }
});
