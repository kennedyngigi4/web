"use client"

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQItem } from '@/lib/models';



const FrequentlyAskedQuestions = () => {

    const [ faqs, setFaqs ] = useState<FAQItem[]>([]);

    useEffect(() => {
        const fetchFAQs = async() => {
            const res = await fetch("/faqs.json");
            const data = await res.json();
            setFaqs(data);
        }
        fetchFAQs();
    }, [])

    return (
        <section className="min-h-screen flex flex-col space-y-3.5 p-6">
            <div>
                <h1 className="text-3xl max-md:text-2xl font-semibold text-orange-400">Frequently Asked Questions</h1>
            </div>
            <div>
                <Accordion type="single" collapsible>
                {faqs.map((faq: FAQItem) => (
                    <AccordionItem key={faq.id} className="bg-white px-5 mb-2 hover:cursor-pointer" value={`faq-${faq.id}`}>
                        <AccordionTrigger className="hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FrequentlyAskedQuestions