import { HTTPResponse, Page } from "puppeteer-core"
import { regions } from "./regionsDict.js"

async function delay(timeout: number): Promise<() => {}> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}


async function reloadOnLag(page: Page): Promise<void> {
    try {
        await page.waitForSelector('div.FeatureAppLayoutBase_layout__0HSBo') // Waiting for root prodict div
    } catch (err) {
        console.log('Antibot screen didn\'t reload, forced to reload.')
        page.reload()
    }
}


async function validateLink(link: string, response: HTTPResponse | null): Promise<Boolean> {
    if (!response) {
        throw new Error('No response. Check your connection')
    }
    if (link.startsWith('https://www.vprok.ru/product') || response.status() || response.status() === 200) {
        return true
    }
    throw new Error('Link is invalid')
}

function validateRegion(region: string): Boolean {
    if (regions.includes(region)) {
        return true
    }
    throw new Error('Invalid region')
}


export { delay, reloadOnLag, validateLink, validateRegion }