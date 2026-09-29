const fs = require("fs");
const raw = fs.readFileSync("data/siteData.json", "utf8");
const lines = raw.split(/\r?\n/);
const at = (n) => lines[n - 1];
const out = [
  ...lines.slice(0, 2501),
  "            }", "          }", "        },", "      },",
  ...lines.slice(2502, 2619),
  ...[2620, 2621, 2622].map((n) => at(n)),
  ...[2626, 2627, 2628].map((n) => at(n)),
];
const next = out.join("\r\n");

let msg = "";
try { JSON.parse(next); } catch (e) { msg = e.message; }
const pos = Number(/position (\d+)/.exec(msg)[1]);
console.log("error pos:", pos, "| msg:", msg);
for (let i = pos - 14; i <= pos + 14; i++) {
  const c = next[i];
  console.log(String(i).padStart(7), "code=" + (c ? c.charCodeAt(0) : -1), JSON.stringify(c));
}
