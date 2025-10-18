import puppeteer, { Page } from "puppeteer";
import { regions } from "../utils/regionsDict.js";

export default async function setRegion(page: Page, regionName: string): Promise<void> {
    // Waiting for #1 button to load and clicking it (Укажите адрес доставки)
    await page.waitForSelector('div[class^="AddNewAddress_addAddress"]')
    try {
        await page.click('div[class^="AddNewAddress_addAddress"]', { delay: 10000 }) // Added delay to ensure that scripts are loaded 
    }
    catch {
        await page.click('div[class^="AddNewAddress_addAddress"]', { delay: 5000 }) // Added delay to ensure that scripts are loaded 
    }

    // Waiting for #2 button to load and clicking it (Меню с регионами (Москва и область по умолчанию))
    await page.waitForSelector('button[class^="RegionButton_regionButton"]')
    await page.click('button[class^="RegionButton_regionButton"]')

    // Waiting for #3 button to load and clicking it (Выбор конкретного города)
    await page.waitForSelector('button[class^="UiRegionListBase_button"]')
    const regionElements = await page.$$('ul[class^="UiRegionListBase_list"] > li[class^="UiRegionListBase_item"] > button[class^="UiRegionListBase_button"]')

    for (const regEl of regionElements) {
        const cityText = await page.evaluate(el => el.textContent.trim(), regEl)

        if (cityText === regionName) {
            await regEl.click()
        }
    }
}