import puppeteer, { Page, Browser } from "puppeteer";
import { proxyAuth, proxyProps, proxy } from "../proxy/proxy.js";
import { reloadOnLag } from "../utils/funcs.js";

export default async function launchBrowser(link: string): Promise<[Page, Browser]> {
    const browser = await puppeteer.launch({ headless: false, ...proxyProps })
    const page = await browser.newPage()

    if (proxy) {
        proxyAuth(page)
    }

    await page.setViewport({ width: 1080, height: 1024 })
    await page.goto(link, { waitUntil: 'domcontentloaded' })

    await reloadOnLag(page)

    return [page, browser]
}