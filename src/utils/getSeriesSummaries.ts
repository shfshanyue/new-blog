import type { CollectionEntry } from "astro:content";

export type SeriesSummary = {
  title: string;
  slug: string;
  count: number;
};

export default function getSeriesSummaries(
  posts: CollectionEntry<"blog">[]
): SeriesSummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const title = post.data.series?.trim();
    if (!title) continue;
    if (post.data.draft === true) continue;

    counts.set(title, (counts.get(title) ?? 0) + 1);
  }

  const summaries: SeriesSummary[] = [...counts.entries()].map(
    ([title, count]) => ({
      title,
      slug: title,
      count,
    })
  );

  summaries.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.title.localeCompare(b.title, "zh-CN");
  });

  return summaries;
}
