const fs = require("fs");
const raw = fs.readFileSync("data/siteData.json", "utf8");
const eol = raw.includes("\r\n") ? "\r\n" : "\n";
const lines = raw.split(/\r?\n/);
const at = (n) => lines[n - 1];

// Verified depths from depthcheck.cjs.
//   2502 `},`  -> 6   (closes `sidebar`)
//   2620..2622 -> 8,7,6  (close EducationAchievement1, variants, Achievement)
//   2623..2625 -> 5,4,3  (close EducationFaq1, Faq.variants, Faq)  <- moves up
//   2626..2628 -> 2,1,0  (close sections, EducationIndustries, root)  <- stays
const out = [
  ...lines.slice(0, 2501), // lines 1..2501
  " ".repeat(12) + "}", // closes sidebar            7 -> 6
  " ".repeat(10) + "}", // closes EducationFaq1      6 -> 5
  " ".repeat(8) + "},", // closes Faq.variants       5 -> 4
  " ".repeat(6) + "},", // closes Faq                4 -> 3
  ...lines.slice(2502, 2619).map((l) => l.slice(6)), // 2503..2619, dedented
  ...[2620, 2621, 2622].map((n) => at(n).slice(6)),
  ...[2626, 2627, 2628].map((n) => at(n)),
];

const next = out.join(eol);

// Verify the generated text: report the depth at each spliced boundary.
let inStr = false, esc = false, depth = 0;
const d = [0];
for (const line of out) {
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (esc) { esc = false; continue; }
    if (c === "\\") { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === "{" || c === "[") depth++;
    if (c === "}" || c === "]") depth--;
  }
  d.push(depth);
}
console.log("depth at 2502(sidebar close) =", d[2502], "want 6");
console.log("depth at 2503(EducationFaq1) =", d[2503], "want 5");
console.log("depth at 2504(variants close)=", d[2504], "want 4");
console.log("depth at 2505(Faq close)     =", d[2505], "want 3");
console.log("depth at 2506(Achievement)   =", d[2506], "want 4");
console.log("final depth =", d[out.length], "want 0");

try {
  JSON.parse(next);
  fs.writeFileSync("data/siteData.json", next, "utf8");
  const sec = JSON.parse(fs.readFileSync("data/siteData.json", "utf8")).EducationIndustries.sections;
  console.log("WROTE OK");
  console.log("  Faq keys:      ", Object.keys(sec.Faq.variants.EducationFaq1).join(", "));
  console.log("  Achievement keys:", Object.keys(sec.Achievement.variants.EducationAchievement1).join(", "));
} catch (e) {
  console.log("PARSE FAILED:", e.message);
  const m = /line (\d+)/.exec(e.message);
  if (m) {
    const n = Number(m[1]);
    for (let i = n - 4; i <= n + 3; i++) console.log("   ", i, "d=" + d[i], JSON.stringify(out[i - 1]));
  }
}
