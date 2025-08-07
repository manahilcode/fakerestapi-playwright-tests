import { test, expect } from '@playwright/test';
import { BASE_URL, HEADERS, TEST_BOOK } from '../config/secrets';

test('POST create book - Positive', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/Books`, {
    headers: HEADERS,
    data: TEST_BOOK,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  //Assertions
  expect(body.title).toBe(TEST_BOOK.title);

  //Display the created book details
  console.log('📘 Created Book:', body);
});

