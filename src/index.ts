import launchBrowser from "./puppeteer/browser.js";
import setRegion from "./puppeteer/region.js";
import makeScreenshot from "./puppeteer/screenshot.js";
import parseData, { saveToFile } from "./puppeteer/parser.js";
import { delay, validateLink, validateRegion } from "./utils/funcs.js";

const customArgv = process.argv.slice(2)

if (customArgv.length !== 2) {
    throw new Error('Incorrect Syntax. Usage: npm run parse [link] [region]')
}


async function main() {
    const link: string = customArgv[0]
    const regionName: string = customArgv[1]
    validateRegion(regionName)

    const [page, browser, res] = await launchBrowser(link)

    await validateLink(link, res)

    await setRegion(page, regionName)
    const data = await parseData(page)
    await delay(2000)
    await makeScreenshot(page)
    await browser.close()

    await saveToFile(data)
}

main().catch((err) => {
    console.log(err)
    process.exit(1)
})