const { log, err_handler } = require("./utils.js");

async function bahamut_login({ browser, USERNAME, PASSWORD }) {
    log(`開始執行帳號登入程序`);

    log("正在檢測登入狀態");
    let page = await browser.newPage();
    await page.goto("https://www.gamer.com.tw/");
    await page.waitForTimeout(2000);

    let not_login_signal = await page.$("div.TOP-my.TOP-nologin");
    if (not_login_signal) {
        log("登入狀態: 未登入");

        await page.goto("https://user.gamer.com.tw/login.php");
        await page.waitForTimeout(2000);
        log("嘗試登入中");
        await page.type("input#uidh", USERNAME, { delay: 101 }).catch(err_handler);
        await page.waitForTimeout(1000);
        await page.type("input[type=password]", PASSWORD, { delay: 101 }).catch(err_handler);
        await page.waitForTimeout(1000);
        await page.click("button[type=submit]").catch(err_handler);
        await page.waitForNavigation().catch(err_handler);
        await page.waitForTimeout(2000);
        log("成功登入");
    } else {
        log("登入狀態: 已登入");
    }

    await page.close();
    log(`帳號登入程序已完成`);
}

exports.bahamut_login = bahamut_login;
