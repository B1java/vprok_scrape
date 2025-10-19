import { Page } from "puppeteer";

export default async function makeScreenshot(page: Page): Promise<void> {
    await page.screenshot({ path: './lastProduct/last_screenshot.png', fullPage: true })
}

