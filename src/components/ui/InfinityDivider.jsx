export default function Divider({ symbol = "— ∞ —" }) {
  return (
    <p style={{ textAlign: "center", margin: "0", userSelect: "none" }}>
      {symbol}
    </p>
  );
}