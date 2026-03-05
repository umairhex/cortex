import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What databases does Cortex support?",
    answer:
      "Cortex currently supports MongoDB, Supabase, and PostgreSQL. You can connect to any of these databases through the API Integration page and start managing content right away.",
  },
  {
    question: "Is Cortex open source?",
    answer:
      "Yes, Cortex is fully open source and available on GitHub under the MIT license. You can self-host it, contribute to the codebase, or fork it for your own needs.",
  },
  {
    question: "How does the Collection Types Builder work?",
    answer:
      "The Collection Types Builder lets you visually define your content schemas. You can add fields like text, rich text, numbers, dates, images, booleans, and JSON. Each collection type becomes a structured template for your content entries.",
  },
  {
    question: "What field types are supported?",
    answer:
      "Cortex supports short text, long text, rich text, rich markdown, dates, numbers, media/image uploads, booleans, and JSON fields. Each field type comes with built-in validation options.",
  },
  {
    question: "Can I self-host Cortex?",
    answer:
      "Absolutely. Cortex is designed to be self-hosted. Clone the repository, connect your database, and you have a fully functional headless CMS running on your own infrastructure.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-6xl mx-auto py-24 px-4">
      <div className="space-y-2 mb-12">
        <h2 className="text-4xl font-semibold text-foreground">
          Common questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="max-w-6xl space-y-2">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
