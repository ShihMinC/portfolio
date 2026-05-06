import { Client } from '@notionhq/client';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key && value) acc[key.trim()] = value.join('=').trim();
  return acc;
}, {});

const notion = new Client({ auth: env.NOTION_SECRET });

async function run() {
  const r = await notion.databases.query({ database_id: env.NOTION_DATABASE_ID });
  console.log(JSON.stringify(r.results[0], null, 2));
}

run();
