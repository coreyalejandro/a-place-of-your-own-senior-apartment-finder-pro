'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  showRequired?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, helperText, showRequired, className = '', ...props }, ref) => {
    const inputId = props.id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block font-serif text-lg text-[#5C4A3C]"
        >
          {label}
          {showRequired && (
            <>
              <span className="text-red-600 ml-1" aria-hidden="true">*</span>
              <span className="sr-only">required</span>
            </>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 text-lg border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355] ${
            error ? 'border-red-600' : 'border-[#D4C4B0]'
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          aria-required={showRequired}
          {...props}
        />

        {helperText && !error && (
          <p id={helperId} className="text-sm text-[#8B7355]">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';
