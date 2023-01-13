import dayjs from 'dayjs';
import fs from 'fs-extra';
import path from 'path';

const time = dayjs().startOf('hour');

const filepath = path.resolve(
  `raws/${time.year()}/${time.month() + 1}/${time.date()}/${time.hour()}.json`
);

async function main() {
  const res = await fetch('https://weibo.com/ajax/side/hotSearch');
  const data = await res.json();
  fs.ensureFileSync(filepath);
  fs.writeJSONSync(filepath, data?.data?.realtime);
}

main();
