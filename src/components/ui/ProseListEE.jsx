import Divider from "@components/ui/InfinityDivider";

export default function ProseList({ posts }) {
  return (
    <div className="prose-list">
      {posts.map(({ id, title, slug, date, tags, snippet, linktext }) => (
        <article key={id} className="prose-item">
          <h3>{title}</h3>
          <small>{date} — {tags.join(", ")}</small>
          {/* <p>{snippet} <a href={`/post/${id}`}>{linktext}</a></p> */}
          <p>{snippet} <a href={`/projects/eternas-elysium/${slug}`}>{linktext}</a></p>
        </article>
      ))}
      <Divider />
    </div>
  );
}
