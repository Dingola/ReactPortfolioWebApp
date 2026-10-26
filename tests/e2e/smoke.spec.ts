import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('renders the generated application shell', async ({ page }) => {
  await page.goto('/');

  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: /01.*start/i })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(
    page.getByRole('button', { name: /zum dunklen farbschema wechseln/i }),
  ).toBeVisible();
  await expect(heading.locator('..')).toHaveCSS('opacity', '1');

  const accessibilityResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityResults.violations).toEqual([]);
});

test('navigates between prepared portfolio routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /02.*projekte/i }).click();

  await expect(page).toHaveURL('/work');
  await expect(page.getByRole('heading', { level: 1, name: 'Projekte' })).toBeVisible();
  await expect(page.locator('[data-transition-direction="forward"]')).toBeVisible();
  await expect(page.getByRole('link', { name: /02.*projekte/i })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.goBack();

  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-transition-direction="backward"]')).toBeVisible();

  await page.goForward();

  await expect(page).toHaveURL('/work');
  await expect(page.locator('[data-transition-direction="forward"]')).toBeVisible();
});

test('does not infer a direction for direct route entry', async ({ page }) => {
  await page.goto('/resume');

  await expect(page.getByRole('heading', { level: 1, name: 'Lebenslauf' })).toBeVisible();
  await expect(page.locator('[data-transition-direction="none"]')).toBeVisible();
});

test('disables page movement for reduced motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('link', { name: /02.*projekte/i }).click();

  const pageContent = page.locator('[data-transition-direction="forward"]');
  await expect(page.locator('[data-reduced-motion="true"]')).toBeVisible();
  await expect(pageContent).toHaveCSS('transform', 'none');
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
