import type { LayoutMode } from "./types";

type LayoutToggleProps = {
  layoutMode: LayoutMode;
  onToggle: () => void;
};

const labels: Record<LayoutMode, string> = {
  creative: "Creative",
  split: "Split",
  editorial: "Editorial",
  minimal: "Minimal",
};

export default function LayoutToggle({ layoutMode, onToggle }: LayoutToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface-strong)] px-3 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
      aria-label="Toggle layout template"
      title="Switch page layout template"
    >
      <span>{labels[layoutMode]}</span>
    </button>
  );
}
