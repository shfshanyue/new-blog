#!/usr/bin/env node
/**
 * Migrate VuePress columns from OLD_BLOG into this Astro blog (nested IDs).
 *
 * OLD_BLOG=/abs/path/old-blog node scripts/migrate-old-blog.mjs
 */

import fs from "fs";
import path from "path";

import { SERIES } from "./migrate-series-config.mjs";

const OLD =
  process.env.OLD_BLOG ?? path.join(process.env.HOME ?? "", "code/projects/old-blog");

const DST = path.join(process.cwd(), "src/content/blog");
const PUB = path.join(process.cwd(), "public/assets");

const M = dir => fs.mkdirSync(dir, { recursive: true });

function cpRecursive(src, dst) {
  if (!fs.existsSync(src)) return;
  M(dst);
  fs.readdirSync(src, { withFileTypes: true }).forEach(ent => {
    const a = path.join(src, ent.name);
    const b = path.join(dst, ent.name);
    if (ent.isDirectory()) cpRecursive(a, b);
    else fs.copyFileSync(a, b);
  });
}

/** Copy loose image files sitting next to markdown in series root. */
function copyLooseImages(seriesDir, outAssets) {
  if (!fs.existsSync(seriesDir)) return;
  for (const name of fs.readdirSync(seriesDir)) {
    const fp = path.join(seriesDir, name);
    if (!fs.statSync(fp).isFile()) continue;
    if (!/\.(?:png|jpe?g|gif|webp|svg)$/i.test(name)) continue;
    M(outAssets);
    fs.copyFileSync(fp, path.join(outAssets, name));
  }
}

function splitFrontmatter(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/m.exec(src);
  if (!m) return { block: "", body: src.trimEnd() };
  const block = m[1] ?? "";
  const body = src.slice(m[0].length).trimEnd();
  return { block, body };
}

/** Single-line YAML field (title, date, description, …). */
function pickYamlLine(block, key) {
  if (!block) return "";
  const re = new RegExp(`^${key}:\\s*(.*)$`, "m");
  const hit = re.exec(block);
  if (!hit) return "";
  let v = hit[1]?.trim() ?? "";
  const q = /^['"]([\s\S]*?)['"]$/.exec(v);
  if (q) return q[1];
  if (key === "tags") return ""; // parsed by parseTagsYaml
  return v.replace(/^['"]|['"]$/g, "");
}

function parseTagsYaml(block) {
  if (!block) return [];

  const lines = block.split(/\r?\n/);

  /** line index of tags: header */
  const row = lines.findIndex(l => /^tags:\s*/.test(l));
  if (row === -1) return [];

  const rest = /^tags:\s*(.*)$/.exec(lines[row].trim())?.[1]?.trim() ?? "";

  /** inline [...] */
  if (rest.startsWith("["))
    try {
      return JSON.parse(rest.replace(/'/g, '"')).map(String);
    } catch {
      /* fallthrough */
    }

  /** block list under tags: */
  if (!rest.length) {
    const out = [];
    for (let i = row + 1; i < lines.length; i++) {
      const ln = lines[i];
      if (!/^\s+-\s/.test(ln) && ln.trim()) break;
      if (/^\s+-\s/.test(ln))
        out.push(
          ln
            .replace(/^\s*-\s*/, "")
            .trim()
            .replace(/^['"]|['"]$/g, ""),
        );
    }
    return out.filter(Boolean);
  }

  return [rest.replace(/^['"]|['"]$/g, "")].filter(Boolean);
}

function firstMarkdownHeading(markdownBody) {
  let fenced = false;
  for (const line of markdownBody.split(/\r?\n/)) {
    const t = line.trimStart();
    if (/^```/.test(t)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const hm = /^#+\s+(.+)/.exec(t);
    if (hm) return hm[1].trim();
  }
  return "";
}

function toFallbackDescription(markdownBody) {
  let t = markdownBody
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+]\([^)]+\)/g, "$1")
    .replace(/`+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.slice(0, 170);
}

function toDatetime(v) {
  const fb = "2020-01-01T00:00:00+08:00";
  if (!v) return fb;
  const s = String(v).trim().replace(/\s+/g, " ");
  const m = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{1,2}):(\d{2}))?$/.exec(s);
  if (!m) return fb;
  const hh = String(Number(m[2] ?? 0)).padStart(2, "0");
  const mm = String(Number(m[3] ?? 0)).padStart(2, "0");
  return `${m[1]}T${hh}:${mm}:00+08:00`;
}

function mergeTags(seriesTags, extra) {
  const out = [...seriesTags];
  for (const t of extra) {
    const q = String(t).trim();
    if (q && !out.includes(q)) out.push(q);
  }
  return out.length ? out : ["others"];
}

function rewriteImagePaths(markdownBody, seriesSlug) {
  return markdownBody
    .replace(
      /!\[([^\]]*)]\(\.\/assets\/([^)]+)\)/g,
      (_, alt, tail) => `![${alt}](/assets/${seriesSlug}/${tail})`,
    )
    .replace(/!\[([^\]]*)]\(\/assets\/images\/([^)]+)\)/g, (_, alt, tail) =>
      `![${alt}](/assets/${seriesSlug}/${tail})`,
    )
    .replace(
      /!\[([^\]]*)]\(\/frontend-engineering\/assets\/([^)]+)\)/g,
      (_, alt, tail) => `![${alt}](/assets/${seriesSlug}/${tail})`,
    )
    .replace(
      /!\[([^\]]*)]\(([A-Za-z0-9._-]+\.(?:png|jpe?g|gif|webp|svg))\)/g,
      (_, alt, tail) => `![${alt}](/assets/${seriesSlug}/${tail})`,
    );
}

function readMeta(seriesDir) {
  const fp = path.join(seriesDir, "meta.json");
  if (!fs.existsSync(fp)) return [];
  try {
    const raw = fs.readFileSync(fp, "utf8").trim();
    if (!raw) return [];
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) return [];
    return rows
      .filter(r => r && typeof r === "object")
      .map(r => ({
        path: r.path ?? r.slug ?? r.id ?? "",
        title: r.title,
        date: r.date,
        description: r.description,
        sideTitle: r.sideTitle,
      }))
      .filter(r => typeof r.path === "string" && r.path.length);
  } catch (err) {
    console.warn(`meta.json parse failed (${seriesDir}):`, err.message);
    return [];
  }
}

function stemsFromDisk(seriesDir) {
  if (!fs.existsSync(seriesDir)) return [];
  return fs
    .readdirSync(seriesDir)
    .filter(n => /\.md$/i.test(n))
    .map(n => path.basename(n, path.extname(n)))
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Unified article order:
 * meta.json rows → explicit cfg.order (when no meta) → remaining .md on disk (alpha).
 * Rows from meta appear even if `.md` is missing (stub from meta).
 */
function orderedArticleKeys(seriesDir, cfg, metaRows) {
  const onDiskSet = new Set(stemsFromDisk(seriesDir));

  /** path -> merged meta lookup */
  const metaByStem = Object.create(null);
  for (const r of metaRows) {
    metaByStem[r.path.trim()] = r;
  }

  const out = [];
  const seen = new Set();

  function pushStem(stem) {
    stem = String(stem || "").trim();
    if (!stem || seen.has(stem)) return;
    seen.add(stem);
    out.push(stem);
  }

  metaRows.forEach(r => pushStem(r.path.trim()));
  if (metaRows.length === 0 && Array.isArray(cfg.order)) cfg.order.forEach(pushStem);

  for (const s of stemsFromDisk(seriesDir)) pushStem(s);

  return { stems: out, metaByStem, onDiskSet };
}

function stringifyFrontmatter(fields) {
  const tagStr = `[${fields.tags.map(t => JSON.stringify(String(t))).join(", ")}]`;
  let s = "---\n";
  s += `title: ${JSON.stringify(fields.title)}\n`;
  s += `description: ${JSON.stringify(fields.description ?? "")}\n`;
  s += `pubDatetime: ${fields.pubDatetime}\n`;
  s += `tags: ${tagStr}\n`;
  s += `series: ${JSON.stringify(fields.series)}\n`;
  s += `seriesOrder: ${fields.seriesOrder}\n`;
  s += `draft: ${fields.draft}\n`;
  s += "---\n";
  return s;
}

function migrateSeries(cfg) {
  const seriesDir = path.join(OLD, cfg.dir);
  if (!fs.existsSync(seriesDir)) {
    console.warn(`skip missing series dir: ${seriesDir}`);
    return;
  }

  const metaRows = readMeta(seriesDir);
  const { stems, metaByStem } = orderedArticleKeys(seriesDir, cfg, metaRows);

  const outMdDir = path.join(DST, cfg.slug);
  const outAssetsDir = path.join(PUB, cfg.slug);
  M(outMdDir);
  M(outAssetsDir);

  cpRecursive(path.join(seriesDir, "assets"), outAssetsDir);
  copyLooseImages(seriesDir, outAssetsDir);

  stems.forEach((stem, idx) => {
    const seriesOrder = idx + 1;
    const fp = path.join(seriesDir, `${stem}.md`);
    const mergedMeta = metaByStem[stem];
    let raw = "";

    let block = "";
    let bodyMd = "";

    if (fs.existsSync(fp)) {
      raw = fs.readFileSync(fp, "utf8");
      const sp = splitFrontmatter(raw);
      block = sp.block;
      bodyMd = sp.body;
    } else {
      bodyMd = "";
    }

    const titleFromFm = pickYamlLine(block, "title");
    let title =
      (mergedMeta?.title && String(mergedMeta.title).trim()) ||
      titleFromFm ||
      firstMarkdownHeading(bodyMd) ||
      stem;

    /** trim UTF-16 length heuristic; bytes for draft rule only */
    const bodyBytes = Buffer.byteLength(bodyMd.trim(), "utf8");

    /** Content rule: VuePress stubs are tiny (<100 bytes UTF-8) */
    const isStubArticle = fs.existsSync(fp) ? bodyBytes <= 100 : true;

    const descYaml = pickYamlLine(block, "description");
    let description =
      (mergedMeta?.description && String(mergedMeta.description).trim()) ||
      descYaml ||
      pickYamlLine(block, "subtitle") ||
      (isStubArticle ? "" : toFallbackDescription(bodyMd));

    /** strip inline backticks clutter for readability */
    description = String(description).replace(/\s+/g, " ").trim();

    const dateRaw = mergedMeta?.date ?? pickYamlLine(block, "date");
    const pubDatetime = toDatetime(dateRaw);

    const fileTags = parseTagsYaml(block);
    const tags = mergeTags(cfg.tags, fileTags);

    const rewritten = isStubArticle ? "" : rewriteImagePaths(bodyMd, cfg.slug);
    let finalBody =
      rewritten.trim().length === 0 && isStubArticle ? "" : `${rewritten}\n`;

    const fm = stringifyFrontmatter({
      title,
      description: description.slice(0, 500),
      pubDatetime,
      tags,
      series: cfg.series,
      seriesOrder,
      draft: isStubArticle,
    });

    const outPath = path.join(outMdDir, `${stem}.md`);
    if (fs.existsSync(outPath)) {
      console.warn(`skip collide: ${path.relative(process.cwd(), outPath)}`);
      return;
    }

    fs.writeFileSync(outPath, fm + (finalBody ? `\n${finalBody}` : `\n`), "utf8");
    console.log(`${cfg.slug}/${stem}.md`);
  });
}

function main() {
  if (!fs.existsSync(OLD)) {
    console.error(`OLD_BLOG not found: ${OLD}`);
    process.exit(1);
  }
  console.log(`using OLD_BLOG=${OLD}`);
  for (const cfg of SERIES) migrateSeries(cfg);
  console.log("done.");
}

main();
