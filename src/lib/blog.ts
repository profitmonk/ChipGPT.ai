import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  featured?: boolean;
  // Optional skim layer (flat frontmatter fields). Present on the bug-class posts.
  tldrBug?: string;
  tldrMiss?: string;
  tldrFix?: string;
  // Series / OG-card fields (flat frontmatter). Present on the numbered bug files.
  bugNumber?: string;
  codename?: string;
  ogMono?: string;
  stakes?: string;
  severity?: string;
  evidence?: string;
  teaser?: string;
};

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const meta: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body };
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inline formatting for our controlled markdown subset: code, bold, links.
function inline(s: string): string {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return out;
}

// Minimal, dependency-free markdown renderer for the blog's known subset:
// h2/h3, paragraphs, bold, inline code, links, tables, blockquotes, hr, ul, ol.
export function renderMarkdown(body: string): string {
  const lines = body.split("\n");
  const out: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const cells = (row: string) =>
    row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "") {
      flush();
      i++;
    } else if (t === "---") {
      flush();
      out.push("<hr/>");
      i++;
    } else if (t.startsWith("### ")) {
      flush();
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
      i++;
    } else if (t.startsWith("## ")) {
      flush();
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
      i++;
    } else if (t.startsWith(">")) {
      flush();
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
    } else if (t.startsWith("|")) {
      flush();
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      const head = cells(rows[0]);
      let tbl =
        "<table><thead><tr>" +
        head.map((h) => `<th>${inline(h)}</th>`).join("") +
        "</tr></thead><tbody>";
      for (const r of rows.slice(2)) {
        tbl +=
          "<tr>" + cells(r).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
      }
      out.push(tbl + "</tbody></table>");
    } else if (/^[-*]\s+/.test(t)) {
      flush();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      out.push("<ul>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>");
    } else if (/^\d+\.\s+/.test(t)) {
      flush();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      out.push("<ol>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ol>");
    } else {
      para.push(t);
      i++;
    }
  }
  flush();
  return out.join("\n");
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      f,
      meta: parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8")).meta,
    }))
    // Only real posts render: a file needs title + date frontmatter. This skips
    // STYLE.md (the writing brief) and any other non-post markdown in this folder.
    .filter(({ meta }) => meta.title && meta.date)
    .map(({ f, meta }) => ({
      slug: f.replace(/\.md$/, ""),
      title: meta.title,
      description: meta.description || "",
      date: meta.date || "",
      author: meta.author || undefined,
      featured: meta.featured === "true",
      bugNumber: meta.bug_number || undefined,
      codename: meta.codename || undefined,
      severity: meta.severity || undefined,
      teaser: meta.teaser || undefined,
    }))
    // Featured posts pin to the top, then newest-first by date.
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.date < b.date ? 1 : -1;
    });
}

// The numbered "Silicon Bug Files" series (posts with a bug_number), in order.
export function getSeriesPosts(): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.bugNumber)
    .sort((a, b) => (a.bugNumber! < b.bugNumber! ? -1 : 1));
}

export function getPost(
  slug: string,
): { meta: PostMeta; html: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { meta, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  // Non-post markdown (e.g. STYLE.md) has no title/date; don't render it as a post.
  if (!meta.title || !meta.date) return null;
  return {
    meta: {
      slug,
      title: meta.title || slug,
      description: meta.description || "",
      date: meta.date || "",
      author: meta.author || undefined,
      featured: meta.featured === "true",
      tldrBug: meta.tldr_bug || undefined,
      tldrMiss: meta.tldr_miss || undefined,
      tldrFix: meta.tldr_fix || undefined,
      bugNumber: meta.bug_number || undefined,
      codename: meta.codename || undefined,
      ogMono: meta.og_mono || undefined,
      stakes: meta.stakes || undefined,
      severity: meta.severity || undefined,
      evidence: meta.evidence || undefined,
      teaser: meta.teaser || undefined,
    },
    html: renderMarkdown(body),
  };
}
