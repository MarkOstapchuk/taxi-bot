import {chromium, webkit} from "playwright";
import {Page} from "@playwright/test";

function log(...args: any[]) {
    console.log((new Date()).toString() + ' ', ...args)
}

async function login(page: Page) {
    await page.locator('input[name=login]').fill('fodreks')
    await page.locator('input[name=password]').fill('gWCYJEZY8')

    await page.locator('iframe[title=reCAPTCHA]').click();
    await page.locator('.formRow.checkboxRow > label').click();
    await page.locator('button[type=submit]').click();
}

async function car(page: Page, id: string, level: number, type: string) {
    const car = page.locator(`div[data-taxi-id="${id}"]`)
    const finishBtn = car.locator('button.btn.btn-success.btn-block.finishOrder')

    if (!await finishBtn.isHidden()) {
        log('finished order on car ', id)
        await finishBtn.click()
        //await page.locator('button[type=button][data-dismiss=collapse].btn.btn-primary').click()
        return;
    }
    const getOrderBtn = car.locator('a[data-purpose=get-order]')
    if (!await getOrderBtn.isHidden()) {
        log('go to take order on ', id)
        await getOrderBtn.click()
        await takeOrder(page, level, type)
        return;
    }
    log('no actions on', id)

}

async function takeOrder(page: Page, level: number, type: string) {

    let modal = page.locator('.modal').locator('a.close.text-center');
    if (!(await modal.isHidden())) {
        await modal.click()
    }
    const checkReload = setInterval(async () => {
        const reloadBlock = page.locator('div[data-container=orders-expired].orders-grid-row.row.animated.faster.flipInX')
        if (!await reloadBlock.isHidden()) {
            log('reload orders')
            let reloadOrders = reloadBlock.locator('button.btn.btn-primary[data-reload-order=true]')
            await reloadOrders.click()
        }
    }, 3000)

    await new Promise(r => setTimeout(r, 1000));
    const orders = await page.locator('div.order').all()


    for (let order of orders) {
        const carLevel = await order.locator('.level-block').locator('span').innerText()
        const carType = await order.locator('.oParam.oType').innerText()

        if (carLevel.trim() === level.toString() && carType.trim() === type) {
            let flag = true
            while (flag) {
                for (let button of await order.locator('div.oBottom').locator('div.row-flex.align-items-center').locator('div').filter({hasText: 'Взять заказ'}).all()) {
                    const right = await button.evaluate((el) => {
                        return window.getComputedStyle(el).getPropertyValue('right');
                    });
                    if (right !== '5px') {
                        await button.locator('button').click()
                        await new Promise(r => setTimeout(r, 2000));
                        const captcha = page.locator('div.captchaQuestion')
                        if (!await captcha.isHidden()) {
                            const buttons = await captcha.locator('div.captchaAnswers').locator('button').all()
                            const rand = Math.round(Math.random() * 3)
                            await buttons[rand].click()
                            await new Promise(r => setTimeout(r, 2000));
                            const closeBtn = order.locator('button[type=button][data-dismiss=panel].btn-danger')
                            if (!await closeBtn.isHidden()) {
                                await closeBtn.click()
                            } else {
                                flag = false
                                log('took order');
                                break;

                            }
                        } else {
                            flag = false
                            break
                        }

                    }
                }
            }
            break;
        }
    }

    clearInterval(checkReload);
}

async function start(page: Page, id: string, level: number) {
    await page.goto('https://www.taxi-polis.xyz/garage');

    let modal = page.locator('.modal').locator('a.close.text-center');

    if (!(await modal.isHidden())) {
        await modal.click()
    }
    await car(page, id, level, 'ЭЛИТА')
    //await car(page, '435484', 1)
}
async function launchBrowser() {
    const browser = await chromium.launchPersistentContext('/Users/mark/WebstormProjects/taxi-bot/context', {
        headless: false,
        slowMo: 50,
        viewport: null
    });
    log('browser open')
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();
    await start(page1, '408134', 2)
    await start(page2, '435484', 1)
    await page1.close()
    await page2.close()
    await browser.close()
    log('browser close')
}
(async () => {
    await launchBrowser()
    setInterval(async () => {
            await launchBrowser()
        },
        120000
        //1200000
    )


})();