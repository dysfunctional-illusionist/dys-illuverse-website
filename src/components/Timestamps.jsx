export default function ShowTimestamps({created, updated, integrity }) {
  //if (!created && !updated) return null;
  //console.log({ created, updated, integrity });

  const dateFmt = d => new Date(d).toLocaleDateString();

  const integrityLabel = () => {
    switch (integrity) {
      case "verified":
        return <p className="text-green-500/30">✔ timeline verified</p>;
      case "hash-mismatch":
        return <p className="text-red-500/30">⚠ history in jeopardy</p>;
      case "from-github":
        return <p className="text-yellow-500/30"> history from universal timeline </p>;
      default:
        return null;
    }
  };

  return (
    <div className="timestamp">
      {created && <p className="text-gray-100/50">Created: {dateFmt(created)}</p>}
      {updated && <p className="text-gray-100/70">Updated: {dateFmt(updated)}</p>}
      {integrityLabel()}
    </div>
  );
}
