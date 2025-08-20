export default function StarDivider({ symbol = "— ★ —" }) {
  return (
    <p style={{ textAlign: "center", margin: "1em 0", userSelect: "none" }}>
      {symbol}
    </p>
  );
}