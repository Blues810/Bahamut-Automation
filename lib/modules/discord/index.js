/* minified */
const fetch=require("node-fetch");exports.parameters=[{name:"dc_url",required:!0}],exports.run=async({outputs:r,params:e,logger:o})=>{var t=(...r)=>o.error("[95m[Discord][m",...r),c=e["dc_url"];r.report?c?(e=(await r.report.markdown()).replace(/^#+([^#].*)/gm,r=>`**${r.replace(/^#+/,"").trim()}**`),r=(await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:null,embeds:[{title:r.report.title,color:1146518,description:e}]})}))["ok"],r?o.log("[95m[Discord][m","已發送 Discord 報告！"):(e=[e],o.info("[95m[Discord][m",...e),t("發送 Discord 報告失敗！"))):t("請設定 Discord Webhook (dc_url)"):t("請設定 report 模組")};