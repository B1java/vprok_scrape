import { Page } from "puppeteer";
import { ProductData } from "../types/types.js";
import { writeFile } from 'fs/promises';

export default async function parseData(page: Page): Promise<ProductData> {
    await page.waitForSelector('div.ProductPage_buy__I_iyc')

    const data = await page.evaluate(() => {
        if (document.querySelector('div.ProductPage_buy__I_iyc')) {
            const oldPrice = document.querySelector('span.Price_price__QzA8L.Price_size_XS__ESEhJ.Price_role_old__r1uT1')?.textContent.trim() || null
            const newPrice = document.querySelector('span.Price_price__QzA8L.Price_size_XL__MHvC1.Price_role_discount__l_tpE')?.textContent.trim().split('/')[0] || null
            const regPrice = document.querySelector('span.Price_price__QzA8L.Price_size_XL__MHvC1.Price_role_regular__X6X4D')?.textContent.trim() || null

            const reviewsCount = document.querySelector('.ActionsRow_reviews__AfSj_')?.textContent.trim().split(' ')[0] || null
            const rating = document.querySelector('.ActionsRow_stars__EKt42')?.textContent.trim() || null


            return {
                price: {
                    oldPrice,
                    newPrice,
                    regPrice
                },
                feedback: {
                    reviewsCount,
                    rating
                }
            }
        }

        throw new Error('Data was not parsed')
    })
    return data
}

export async function saveToFile(data: ProductData): Promise<void> {
    try {
        const json = JSON.stringify(data, null, 2)

        await writeFile('lastProduct/last_data.json', json, 'utf-8')
    } catch (err) {
        console.log(`An error occured while writing data to a file: \n${err}`)
    }
}