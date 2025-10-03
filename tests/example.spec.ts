import { test, expect, request } from '@playwright/test';
import { ApiPage } from '../apiPage';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.describe('API Testing with POM', () => {
  let api: ApiPage;

  test.beforeAll(async ({ playwright }) => {
    const reqContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com', // Example API
    });
    api = new ApiPage(reqContext);
  });

  test('should get user details', async () => {
    const response = await api.request.get('/users/1');
    const user = await api.getUser(1);
    expect(user).toHaveProperty('id', 1);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    console.log(response);
  });

  test('should create a new user', async () => {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    const user = await api.createUser(newUser);
    expect(user).toMatchObject(newUser);
  });

  test('should update a user', async () => {
    const updatedData = { name: 'Jane Doe' };
    const user = await api.updateUser(1, updatedData);
    expect(user).toMatchObject(updatedData);
  });
});
