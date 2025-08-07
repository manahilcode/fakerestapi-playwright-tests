

export const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

export const HEADERS = {
  'Content-Type': 'application/json'
};

export const TEST_BOOK = {
  id: 999,
  title: 'Test Book',
  description: 'This is a test description',
  pageCount: 200,
  excerpt: 'Test excerpt',
  publishDate: '2025-08-01T00:00:00.000Z'
};

export const INVALID_BOOK = {
  name: 'Only name present' // invalid payload
};

export const LONG_DESCRIPTION = 'a'.repeat(10000); // edge case
