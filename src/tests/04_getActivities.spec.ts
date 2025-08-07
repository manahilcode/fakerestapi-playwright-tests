import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/secrets';

test('GET all activities - Positive', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/Activities`);
  
  // Check response status
  expect(response.status()).toBe(200);

  // Parse the JSON body
  const body = await response.json();

  // Check the response is an array and contains expected keys
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0); // Ensure there's at least one activity
  expect(body[0]).toHaveProperty('title');

  // Displaying first few activities in the console
  console.log('Fetched Activities Sample:', body.slice(0, 3)); // Show top 3 activities
});
