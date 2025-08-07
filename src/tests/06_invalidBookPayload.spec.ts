import { test, expect } from '@playwright/test';
import { BASE_URL, HEADERS, INVALID_BOOK } from '../config/secrets';

test('POST book with invalid payload - Negative', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/Books`, {
    headers: HEADERS,
    data: INVALID_BOOK
  });

  const body = await response.json();
  console.log('Response body:', body); // Display the actual result

  expect([400, 500]).toContain(response.status());
});
