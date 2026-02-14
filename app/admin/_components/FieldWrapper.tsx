/* ------------------------------------------------------------------ */
/*  Reusable form field wrapper with consistent label styling          */
/* ------------------------------------------------------------------ */

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

export default function FieldWrapper({ label, htmlFor, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
