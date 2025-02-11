import { useState } from 'react';
import { IoCopy, IoEye, IoEyeOff } from 'react-icons/io5';

interface UrlFieldProps {
  /** The URL to display/copy */
  url: string;
}

/**
 * A fieldset with a legend "URL," a masked input,
 * plus copy & toggle-visibility icons.
 */
export function UrlField({ url }: UrlFieldProps) {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <fieldset className="relative w-full rounded-md border border-secondaryColor px-2 pb-3.5 pt-2">
      {/* The small "URL" label over the top border */}
      <legend className="px-2 text-xs uppercase text-gray-500">URL</legend>

      {/* The input + icons row */}
      <div className="flex items-center justify-between">
        {/* Masked input by default, toggles to plaintext if visible=true */}
        <input
          type={visible ? 'text' : 'password'}
          readOnly
          value={url}
          className="flex-1 border-none bg-transparent px-1 text-sm text-gray-700 outline-none"
        />

        <div className="flex items-center gap-2 pr-1">
          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Copy URL">
            <IoCopy size={18} />
          </button>

          {/* Toggle visibility button */}
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Toggle URL visibility">
            {visible ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </button>
        </div>
      </div>
    </fieldset>
  );
}
