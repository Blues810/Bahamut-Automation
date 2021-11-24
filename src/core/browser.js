const playwright = require("playwright");

const BRWOSER_TYPES = ["chromium", "firefox", "webkit"];

const DEFAULT_BROWSER_CONFIG = {
    headless: true,
    args: ["--disable-web-security", "--disable-features=IsolateOrigins,site-per-process", "--disable-gpu"],
};

let browser = null,
    context = null,
    user_agent = "";

async function open_browser(type = "firefox", config = {}) {
    if (!BRWOSER_TYPES.includes(type)) {
        type = "firefox";
    }

    const target = playwright[type];

    browser = await target.launch(config, {
        ...DEFAULT_BROWSER_CONFIG,
        ...config,
    });

    const temp_page = await browser.newPage();
    user_agent = (await temp_page.evaluate(() => navigator.userAgent)).replace("Headless", "") + " BA/1";
    await temp_page.close();

    context = await browser.newContext({ userAgent: user_agent });

    return { browser, context };
}

async function new_page(config = {}) {
    if (!context) throw new Error("No Context.");

    const page = await context.newPage(config);

    return page;
}

async function close_all() {
    if (browser) {
        await browser.close();
        return true;
    }

    return false;
}

module.exports = { open_browser, new_page, close_all };