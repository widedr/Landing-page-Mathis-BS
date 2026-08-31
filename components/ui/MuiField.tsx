import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type MuiFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

/**
 * Champ « MUI outlined » : label cranté sur la bordure supérieure, angles à 0,
 * conforme au formulaire personnalisé du Figma (section CTA finale).
 */
export const MuiField = forwardRef<HTMLInputElement, MuiFieldProps>(
  function MuiField({ label, id, name, required, className, ...props }, ref) {
    const fieldId = id ?? name;
    return (
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          name={name}
          required={required}
          placeholder=" "
          className={cn(
            "peer h-14 w-full rounded-none border border-[rgba(0,0,0,0.23)] bg-white px-3.5 font-ui text-base text-ink outline-none transition-colors hover:border-ink focus:border-2 focus:border-primary",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={fieldId}
          className="pointer-events-none absolute -top-2 left-2.5 bg-white px-1 font-ui text-xs text-slate peer-focus:text-primary-ink"
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      </div>
    );
  },
);
