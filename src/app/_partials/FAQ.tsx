import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/Accordion';
import { useTranslations } from 'next-intl';

export function FAQSection() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();

  // Manually create the FAQ items array using the data we know exists
  const faqItems = [];

  // Try to populate 15 items - we know from your JSON there are 15 questions
  for (let i = 1; i <= 15; i++) {
    try {
      const question = t(`Labels.landingPage.faq.question.${i}`);
      const answer = t(`Labels.landingPage.faq.awnser.${i}`);

      // Only add if both question and answer are valid strings
      if (typeof question === 'string' && typeof answer === 'string') {
        faqItems.push({ id: i, question, answer });
      }
    } catch (e) {
      // Skip any items that cause translation errors
      console.error(`Error loading FAQ item ${i}:`, e);
    }
  }

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
            {faqItems.map(item => (
              <div key={item.id}>
                <AccordionItem value={`item-${item.id}`}>
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
