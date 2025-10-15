import dayjs from 'dayjs';
import fs from 'fs-extra';
import path from 'path';

const time = dayjs().startOf('hour');

const filepath = path.resolve(
  `raws/${time.year()}/${time.month() + 1}/${time.date()}/${time.hour()}.json`
);

async function main() {
  const res = await fetch('https://weibo.com/ajax/side/hotSearch', {
    headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=1, i",
        referer: "https://weibo.com/hot/search",
        "sec-ch-ua":
            '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0",
        "x-requested-with": "XMLHttpRequest",
    },
});
  const data = await res.json();
  fs.ensureFileSync(filepath);
  fs.writeJSONSync(filepath, data?.data?.realtime);
}

main();
