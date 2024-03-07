import {test, expect, request} from '@playwright/test';
import {AuthenticationRequest} from "../src/app/models/auth/authentication-request";
import {environment} from "../src/environments/environment.development";

test("Able to login with valid credentials", async ({ request }) => {
  const baseUrl = 'http://localhost:8080/api/v1/auth/authenticate';
  const authRequestTest: AuthenticationRequest = {
    email: environment.userEmail,
    password: environment.userPassword
  }
  await request.post(`${baseUrl}`, {
    data: authRequestTest,
  });
  // expect(Response.status()).toBe(200);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
