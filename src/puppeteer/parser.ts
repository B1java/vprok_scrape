import { Page } from "puppeteer";
import { ProductData } from "../types/types.js";
import { writeFile } from 'fs/promises';

export default async function parseData(page: Page): Promise<ProductData> {
    await page.waitForSelector('div[class^="ProductPage_buy"]')

    const data = await page.evaluate(() => {
        if (document.querySelector('div[class^="ProductPage_buy"]')) {
            const oldPrice = document.querySelector('span[class^="Price_price"][class*="Price_size_XS"][class*="Price_role_old"]')?.textContent.trim() || null
            const newPrice = document.querySelector('span[class^="Price_price"][class*="Price_size_XL"][class*="Price_role_discount"]')?.textContent.trim().split('/')[0] || null
            const regPrice = document.querySelector('span[class^="Price_price"][class*="Price_size_XL"][class*="Price_role_regular"]')?.textContent.trim() || null

            const reviewsCount = document.querySelector('a[class^="ActionsRow_reviews"]')?.textContent.trim().split(' ')[0] || null
            const rating = document.querySelector('a[class^="ActionsRow_stars"]')?.textContent.trim() || null


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