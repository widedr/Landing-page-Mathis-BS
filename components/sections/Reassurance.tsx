import { Lock, MapPin, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { reassurance } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  location: MapPin,
  lock: Lock,
  user: ShieldCheck,
  people: Users,
};

export function Reassurance() {
  return (
    <section className="border-y border-border bg-white py-8">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {reassurance.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.label} className="flex items-center gap-2.5">
                <Icon className="size-5 shrink-0 text-primary-ink" aria-hidden="true" />
                <span className="font-ui text-sm text-ink">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
