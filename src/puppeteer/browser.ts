import puppeteer, { Page, Browser, HTTPResponse } from "puppeteer";
import { proxyAuth, proxyProps, proxy } from "../proxy/proxy.js";
import { reloadOnLag } from "../utils/funcs.js";

export default async function launchBrowser(link: string): Promise<[Page, Browser, HTTPResponse | null]> {
    const browser = await puppeteer.launch({ ...proxyProps })
    const page = await browser.newPage()

    if (proxy) {
        proxyAuth(page)
    }

    await page.setViewport({ width: 1080, height: 1024 })
    const res = await page.goto(link, { waitUntil: 'domcontentloaded' })
    await reloadOnLag(page)

    return [page, browser, res]
}