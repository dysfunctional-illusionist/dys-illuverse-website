export default function Timestamps({ created, updated, integrity }) {
  if (!created && !updated) return null;

  const dateFmt = d => new Date(d).toLocaleDateString();

  const integrityLabel = () => {
    switch (integrity) {
      case "verified":
        return <p className="text-green-500">✔ timeline verified</p>;
      case "hash-mismatch":
        return <p className="text-red-500">⚠ history in jeopardy</p>;
      case "from-github":
        return <p className="text-yellow-500"> history from universal timeline </p>;
      default:
        return null;
    }
  };

  return (
    <div className="text-sm text-gray-500 space-y-1">
      {created && <p>Created: {dateFmt(created)}</p>}
      {updated && <p>Updated: {dateFmt(updated)}</p>}
      {integrityLabel()}
    </div>
  );
}
