'use client';

import React, { forwardRef, useState } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  secureTextEntry?: boolean;
  setValue: (value: string) => void;
  containerClassName?: string;
  inputClassName?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ secureTextEntry = false, setValue, containerClassName, inputClassName, ...props }, ref) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const handleToggleVisibility = () => {
      setIsSecure(!isSecure);
    };

    return (
      <div className={`relative mb-4 w-full ${containerClassName || ''}`}>
        <input
          ref={ref}
          type={isSecure ? 'password' : 'text'}
          className={`text-blue-80 w-full rounded-md bg-gray-200 px-3 py-3 text-sm placeholder-gray-400 focus:outline-none ${inputClassName || ''} `}
          onChange={e => setValue(e.target.value)}
          {...props}
        />
        {secureTextEntry && (
          <button
            type="button"
            onClick={handleToggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {isSecure ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';
