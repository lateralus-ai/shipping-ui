import type { Page } from "@playwright/test";

export const getStorybookIframePath = (storyId: string) =>
  `/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`;

type StoryViewport = {
  width: number;
  height: number;
};

/** Load a story in isolated iframe mode (no sidebar, no addon panel). */
export const loadStoryInIframe = async (
  page: Page,
  storyId: string,
  viewport: StoryViewport,
) => {
  await page.setViewportSize(viewport);
  await page.goto(getStorybookIframePath(storyId));
  await page.locator("body").waitFor({ state: "visible", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
};
