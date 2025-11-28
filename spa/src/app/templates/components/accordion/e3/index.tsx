import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Typography } from "@/components/typography";

  
  export interface AccordionE3ItemProps {
    title: string;
    description?: string;
    content: string;
  }
  
  interface AccordionE3Props {
    pretext?: string;
    title?: string;
    subtitle?: string;
    items?: AccordionE3ItemProps[];
  }
  
  export default function AccordionE3({
    pretext,
    title,
    subtitle,
    items = [],
  }: AccordionE3Props) {
    return (
      <section data-name="accordion-e3" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {(title || subtitle || pretext) && (
            <div className="mb-12 text-center md:mb-16 lg:mb-20">
              {pretext && (
                <Typography
                  variant="body-large"
                  weight={"light"}
                  className="mb-4"
                >
                  {pretext}
                </Typography>
              )}
              {title && (
                <Typography variant="h2" className="mb-4" weight="light">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="body-large" weight={"light"}>
                  {subtitle}
                </Typography>
              )}
            </div>
          )}
  
          <div className="mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex gap-4 items-center">
                      <Typography variant="h4">{item.title}</Typography>
                      {item.description && (
                        <Typography variant="body-large">
                          {item.description}
                        </Typography>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography
                      variant={"body-large"}
                      weight={"light"}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      className="prose max-w-none"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }
  

  