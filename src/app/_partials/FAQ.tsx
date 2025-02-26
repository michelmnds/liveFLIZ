import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/Accordion';
import { useTranslations } from 'next-intl';

export function FAQSection() {
  const t = useTranslations();

  const faqItems = [
    { question: t('Labels.landingPage.faq.question.1'), answer: t('Labels.landingPage.faq.answer.1') },
    { question: t('Labels.landingPage.faq.question.2'), answer: t('Labels.landingPage.faq.answer.2') },
    { question: t('Labels.landingPage.faq.question.3'), answer: t('Labels.landingPage.faq.answer.3') },
    { question: t('Labels.landingPage.faq.question.4'), answer: t('Labels.landingPage.faq.answer.4') },
    { question: t('Labels.landingPage.faq.question.5'), answer: t('Labels.landingPage.faq.answer.5') }
  ];

  return (
    <section className="bg-background w-full py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {t('Labels.landingPage.faq.title')}
          </h2>
          <p className="text-muted-foreground mt-4 text-xl">{t('Labels.landingPage.faq.subtitle')}</p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <div key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-start text-lg font-medium">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-start">{item.answer}</AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
