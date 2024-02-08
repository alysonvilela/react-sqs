import { Building } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <span className="p-4 font-mono font-black flex gap-2">
        <Building /> CS
      </span>
    </header>
  );
}
