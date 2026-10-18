import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('renders the generated application shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: /01.*start/i })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(
    page.getByRole('button', { name: /zum dunklen farbschema wechseln/i }),
  ).toBeVisible();

  const accessibilityResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityResults.violations).toEqual([]);
});

test('navigates between prepared portfolio routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /02.*projekte/i }).click();

  await expect(page).toHaveURL('/work');
  await expect(page.getByRole('heading', { level: 1, name: 'Projekte' })).toBeVisible();
  await expect(page.getByRole('link', { name: /02.*projekte/i })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('supports keyboard dismissal of the mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: /menü/i });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});
