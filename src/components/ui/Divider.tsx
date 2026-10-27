export function Divider({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`mx-auto flex w-40 items-center justify-center gap-3 py-2 ${light ? "text-ivory" : "text-olive"}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-60" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3c-3 3-3 7 0 9-3 2-3 6 0 9 3-3 3-7 0-9 3-2 3-6 0-9Z" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-60" />
    </div>
  );
}
