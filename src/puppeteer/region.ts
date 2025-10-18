import puppeteer, { Page } from "puppeteer";
import { regions } from "../utils/regionsDict.js";

export default async function setRegion(page: Page, regionName: string): Promise<void> {
    // Waiting for #1 button to load and clicking it (Укажите адрес доставки)
    await page.waitForSelector('div.AddNewAddress_addAddress__7iFlQ')
    await page.click('div.AddNewAddress_addAddress__7iFlQ', { delay: 10000 }) // Added delay to ensure that scripts are loaded 

    // Waiting for #2 button to load and clicking it (Меню с регионами (Москва и область по умолчанию))
    await page.waitForSelector('button.RegionButton_regionButton__zowEw')
    await page.click('button.RegionButton_regionButton__zowEw')


    // Waiting for #3 button to load and clicking it (Выбор конкретного города)
    await page.waitForSelector('button.UiRegionListBase_button__smgMH')
    const regionElements = await page.$$('ul.UiRegionListBase_list__cH0fK > li.UiRegionListBase_item___ly_A.UiRegionListBase_bold__ezwq4 > button.UiRegionListBase_button__smgMH')

    for (const regEl of regionElements) {
        const cityText = await page.evaluate(el => el.textContent.trim(), regEl)

        if (cityText === regionName) {
            await regEl.click()
        }
    }
}

export function validateRegion(region: string): Boolean {
    return regions.includes(region)
}