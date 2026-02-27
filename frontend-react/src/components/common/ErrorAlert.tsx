// Error message alert reusable component
export default function ErrorAlert({
  message,
  onDismiss
}: {
  message: string
  onDismiss: () => void
}) {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <i className="bi bi-exclamation-circle me-2"></i>
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onDismiss}
        aria-label="Cerrar"
      ></button>
    </div>
  )
}
