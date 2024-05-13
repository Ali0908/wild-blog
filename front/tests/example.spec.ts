import {test} from '@playwright/test';
import {AuthenticationRequest} from "../src/app/models/auth/authentication-request";
import {environment} from "../src/environments/environment.development";

// Test vérifiant que l'on peut se connecter avec des identifiants valides
test("Able to login with valid credentials", async ({ request }) => {
  // On crée un objet de type AuthenticationRequest avec les identifiants de l'utilisateur
  const authRequestTest: AuthenticationRequest = {
    email: environment.userEmail,
    password: environment.userPassword
  }
  // On envoie une requête POST à l'API pour se connecter
  await request.post(`${environment.apiUrl}/authenticate`, {
    data: authRequestTest,
  });
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
