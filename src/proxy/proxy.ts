import env from "../env/env.js";
import { Page } from "puppeteer-core";


const proxy = !env.PROXY_LINK ? null : env.PROXY_LINK === 'IP:PORT:USERNAME:PASSWORD' ? null : {
    ip: env.PROXY_LINK?.split(":")[0],
    port: env.PROXY_LINK?.split(":")[1],
    username: env.PROXY_LINK?.split(":")[2],
    password: env.PROXY_LINK?.split(":")[3],
}

const proxyProps = proxy ?  {args: [`--proxy-server=${proxy.ip}:${proxy.port}`]} : {}

async function proxyAuth(page: Page){
    proxy ? await page.authenticate({
        username:proxy?.username,
        password:proxy?.password,
    }) : console.log('[INFO] Starting browser using your ip address. You need to add proxy line into .env file.')
}

export {proxyProps, proxyAuth, proxy}