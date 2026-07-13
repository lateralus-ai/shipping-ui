import { test, expect } from "@playwright/test";
import { canvasStories } from "./canvas-stories";

test.describe("Storybook canvas visual regression", () => {
  canvasStories.forEach(({ id, name, width, clipSelector }) => {
    test(`Canvas: ${name}`, async ({ page }) => {
      await page.setViewportSize({ width: width + 100, height: 900 });
      await page.goto(`/?path=/story/${id}`);
      await page.waitForSelector("iframe#storybook-preview-iframe", { timeout: 30000 });

      const frame = page.frameLocator("#storybook-preview-iframe");
      const canvas = clipSelector
        ? frame.locator(clipSelector).first()
        : frame.locator("[data-figma-page]").first();

      await expect(canvas).toBeVisible({ timeout: 30000 });
      await frame.locator("body").evaluate(() => document.fonts.ready);

      await expect(canvas).toHaveScreenshot(`${name}.png`, {
        maxDiffPixelRatio: 0.05,
      });
    });
  });
});
