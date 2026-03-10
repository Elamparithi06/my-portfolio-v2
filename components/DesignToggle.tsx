import type { DesignMode } from "./types";

type DesignToggleProps = {
  designMode: DesignMode;
  onToggle: () => void;
};

const labels: Record<DesignMode, string> = {
  neon: "Neon",
  sunset: "Sunset",
  mono: "Mono",
};

export default function DesignToggle({ designMode, onToggle }: DesignToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface-strong)] px-3 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
      aria-label="Toggle design mode"
      title="Switch design style"
    >
      <span>{labels[designMode]}</span>
    </button>
  );
}
