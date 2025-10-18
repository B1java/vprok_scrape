import { Page } from "puppeteer-core"

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

export { delay, reloadOnLag }