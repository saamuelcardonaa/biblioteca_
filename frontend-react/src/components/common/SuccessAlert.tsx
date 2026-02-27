// Success message alert reusable component
export default function SuccessAlert({
  message,
  onDismiss
}: {
  message: string
  onDismiss: () => void
}) {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      <i className="bi bi-check-circle me-2"></i>
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
