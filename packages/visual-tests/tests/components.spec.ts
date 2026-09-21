import { test, expect } from '@playwright/test';

const BASE = 'https://galaxy-nebula.vercel.app';

const COMPONENTS = [
  'button', 'card', 'input', 'label', 'textarea', 'select',
  'checkbox', 'radio-group', 'switch', 'slider', 'badge', 'alert',
  'avatar', 'separator', 'skeleton', 'tabs', 'tooltip', 'popover',
  'dialog', 'sheet', 'dropdown-menu', 'accordion', 'progress', 'spinner',
  'alert-dialog', 'breadcrumb', 'table', 'toggle', 'tags-input', 'toggle-group',
  'form', 'kbd', 'pagination', 'empty', 'scroll-area',
  'hover-card', 'menubar', 'command', 'navigation-menu',
] as const;

for (const component of COMPONENTS) {
  test(`${component} — visual regression`, async ({ page }) => {
    await page.goto(`${BASE}/components/${component}`, { waitUntil: 'networkidle' });
    const preview = page.locator('.component-preview').first();
    await expect(preview).toBeVisible({ timeout: 15_000 });
    await page.waitForTimeout(350);
    await expect(preview).toHaveScreenshot(`${component}.png`, {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  });
}
