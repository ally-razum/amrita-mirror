import React from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="card-page__field">
      <label>{label}</label>
      {children}
      {error && <span className="card-page__error">{error}</span>}
    </div>
  );
}
