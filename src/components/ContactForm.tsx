'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="py-16 text-center">
        <div className="w-12 h-12 border-2 border-stone-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4.5 4.5L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-stone-700 text-lg">{t('formSuccess')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
            {t('formName')}
          </label>
          <input
            type="text"
            required
            placeholder={t('formNamePlaceholder')}
            className="w-full border-b border-stone-300 py-3 text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
            {t('formEmail')}
          </label>
          <input
            type="email"
            required
            placeholder={t('formEmailPlaceholder')}
            className="w-full border-b border-stone-300 py-3 text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
          {t('formProject')}
        </label>
        <input
          type="text"
          placeholder={t('formProjectPlaceholder')}
          className="w-full border-b border-stone-300 py-3 text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none focus:border-stone-900 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
          {t('formMessage')}
        </label>
        <textarea
          required
          rows={5}
          placeholder={t('formMessagePlaceholder')}
          className="w-full border-b border-stone-300 py-3 text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none focus:border-stone-900 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-3 text-sm tracking-widest uppercase bg-stone-900 text-white px-10 py-4 hover:bg-stone-700 transition-colors duration-300 disabled:opacity-50"
      >
        {sending ? '...' : `${t('formSend')} →`}
      </button>
    </form>
  );
}
