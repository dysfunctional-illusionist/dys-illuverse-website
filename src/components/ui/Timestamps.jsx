export default function ShowTimestamps({created, updated, integrity }) {
  //if (!created && !updated) return null;
  //console.log({ created, updated, integrity });

  const dateFmt = d => new Date(d).toLocaleDateString();

  const integrityLabel = () => {
    switch (integrity) {
      case "verified":
        return <p className="text-green-500/30">✔ timeline verified</p>;
      case "hash-mismatch":
        return <p className="text-red-400/30">⚠ history in jeopardy</p>;
      case "from-github":
        return <p className="text-yellow-500/30"> history from universal timeline </p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-end">
      <a href="" className="flex justify-end bg-black/30
      p-4 rounded-md w-fit
      hover:bg-indigo-900/40
      transition-colors duration-500">
  
        <div className="timestamp">
          {created && <p className="text-gray-100/30">page created: {dateFmt(created)}</p>}
          {updated && <p className="text-gray-100/10">page updated: {dateFmt(updated)}</p>}
          {/* {integrityLabel()} */}
        </div>
      </a>
    </div>
  );
}
