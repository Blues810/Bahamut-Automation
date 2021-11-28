exports.parameters = [
    {
        name: "guild_max_attempts",
        required: false,
    },
];

exports.run = async ({ page, outputs, params, logger }) => {
    const log = (...args) => logger.log("\u001b[95m[公會簽到]\u001b[m", ...args);
    const error = (...args) => logger.error("\u001b[95m[公會簽到]\u001b[m", ...args);

    if (!outputs.login || !outputs.login.success) throw new Error("使用者未登入，無法進行公會簽到");

    let retry = +params.guild_max_attempts || 3;
    while (retry--) {
        try {
            await page.goto("https://home.gamer.com.tw/joinGuild.php");
            await page.waitForTimeout(2000);
            const guilds = await page.evaluate(() => {
                return [...document.querySelectorAll(".acgbox .acgboximg a")].map((a) => a.href);
            });
            log(`已加入 ${guilds.length} 個公會`);

            for (let guild of guilds) {
                try {
                    await page.goto(guild);
                    await page.waitForTimeout(1000);
                    const name = await page.evaluate(() => {
                        guild.sign();
                        return document.querySelector(".main-container_header_info h1").innerText;
                    });
                    await page.waitForTimeout(2000);
                    log(`已簽到 ${name}`);
                } catch (err) {
                    error(err);
                }
            }
            break;
        } catch (err) {
            error(err);
            await page.waitFor(500);
        }
    }

    return { report };
};

function report({}) {
    let body = `# 公會簽到\n\n`;
    body += `🟢 已執行\n\n`;
    return body;
}
