import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, error, id, className, required, ...props }, ref) {
    const fieldId = id ?? props.name;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="font-ui text-sm font-medium text-ink">
          {label}
          {required && (
            <span className="text-primary-ink" aria-hidden="true">
              {" "}
              *
            </span>
          )}
          {!required && (
            <span className="font-normal text-slate"> (optionnel)</span>
          )}
        </label>
        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            "h-14 rounded-none border border-border bg-white px-4 font-ui text-[15px] text-ink placeholder:text-slate/70 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15",
            error && "border-error focus:border-error focus:ring-error/15",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);
