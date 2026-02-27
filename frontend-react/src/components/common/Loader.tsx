// spinner loader reused across the app
export default function Loader({ size = '3rem', text = 'Cargando...' }: { size?: string; text?: string }) {
  return (
    <div className="text-center py-5">
      <div
        className="spinner-border text-primary"
        style={{ width: size, height: size }}
        role="status"
      >
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="mt-3">{text}</p>
    </div>
  )
}
