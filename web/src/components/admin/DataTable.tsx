export function DataTable({
  columns,
  children,
  empty,
}: {
  columns: string[]
  children: React.ReactNode
  empty?: boolean
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-muted">
                No records yet. Use Add to create the first one.
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  )
}

export function TableActions({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 whitespace-nowrap"><div className="flex items-center justify-end gap-2">{children}</div></td>
}
