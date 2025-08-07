import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET book with invalid ID - Negative', async ({ request }) => {
  const invalidId = 999999;
  const response = await request.get(`${BASE_URL}/Books/${invalidId}`);
  
  expect(response.status()).toBe(404);

  const body = await response.text(); 
  console.log(`Response for invalid ID: ${invalidId} =>`, body);


  expect(body.toLowerCase()).toContain('not found');

});