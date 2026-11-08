export default function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs font-medium uppercase tracking-wider text-mute">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 border border-line bg-paper px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink"
      >
        <option value="">Todos</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
