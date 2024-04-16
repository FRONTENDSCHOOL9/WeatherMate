/*eslint-disable */
function LocationKeywords({ id, label, selected, onClick }) {
  return (
    <div className="bg-slate-300">
      <div
        className={`option ${selected ? 'selected' : ''}`}
        onClick={() => onClick(id)}
      >
        {label}
      </div>
    </div>
  );
}

export default LocationKeywords;
