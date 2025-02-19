'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Textarea } from './Textarea';

interface MessageInputInterface {
  placeholder?: string;
  className?: string;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

export const MessageInput = ({ placeholder, className, message, setMessage, disabled }: MessageInputInterface) => {
  const t = useTranslations('Labels.common.input');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [haveSpecialChar, setHaveSpecialChar] = useState(false);
  const MAX_MESSAGE_LENGTH = 100;

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const noSpecialCharRegex = /^[A-Za-z0-9\s\n]*$/;

    if (noSpecialCharRegex.test(message)) setHaveSpecialChar(false);

    if (!noSpecialCharRegex.test(message)) setHaveSpecialChar(true);
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
  };

  return (
    <div className="relative w-full">
      <Textarea
        value={message}
        disabled={disabled}
        maxLength={MAX_MESSAGE_LENGTH}
        ref={textareaRef}
        onChange={handleChange}
        className={`text-blue-80 min-h-[99px] w-full resize-none overflow-hidden rounded-2xl border-[0.5px] bg-gray-200 px-[15px] py-4 text-sm placeholder-gray-400 outline-none ${className}`}
        placeholder={placeholder || t('messageInputPlaceholder')}
      />
      <span className="absolute bottom-4 right-4 z-10 text-[10px] text-gray-500">
        {messageLength}/{MAX_MESSAGE_LENGTH}
      </span>
      {haveSpecialChar && (
        <span className="absolute bottom-4 left-4 z-10 text-[12px] text-gray-500">{t('messageInputValidation')}</span>
      )}
    </div>
  );
};
