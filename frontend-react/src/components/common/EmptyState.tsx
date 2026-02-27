// Empty state message component
export default function EmptyState({ icon = 'bi-inbox', message }: { icon?: string; message: string }) {
  return (
    <div className="alert alert-info text-center py-5">
      <i className={`bi ${icon}`} style={{ fontSize: '3rem' }}></i>
      <p className="mt-3 mb-0">{message}</p>
    </div>
  )
}
