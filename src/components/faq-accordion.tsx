
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "What does my ticket include?",
        answer: "Your ticket allows one car entry to the event, which gives you access to the pumpkin field, corn maze, our animals, and various photo opportunities. Please note that face painting, pumpkins, food, and drinks are available at an extra cost."
    },
    {
        question: "How many people can I bring with one ticket?",
        answer: "As many people as you can legally fit in your car! The ticket allows admission for one car."
    },
    {
        question: "Is there food and drink available?",
        answer: "Yes, we have food and drink vendors on site for you to enjoy."
    },
    {
        question: "What if I miss my time slot?",
        answer: "Please do your best to arrive within your booked time slot. If you are running late, contact us at 07527 303240, and we will do our best to assist you."
    },
    {
        question: "Is Moonlit Pumpkin Picking suitable for children?",
        answer: "Our Moonlit Picking sessions are designed to be a 'spooky' event aimed at older children and teenagers. We generally don't recommend it for children under 8, but we leave this to parental discretion."
    },
    {
        question: "What should I wear?",
        answer: "We are a working farm, so we strongly recommend wearing wellies or sturdy boots, especially after rain. Dress for the weather, as most activities are outdoors. Layers are always a good idea!"
    },
    {
        question: "Is the site accessible for wheelchairs or pushchairs?",
        answer: "As a working farm, the terrain can be uneven and muddy, which may be challenging for some wheelchairs and pushchairs. Our indoor barn and food areas are more accessible. If you have specific needs, please contact us, and we'll do everything we can to accommodate you."
    },
    {
        question: "Can I bring my dog?",
        answer: "For pumpkin picking, well-behaved dogs on leads are welcome, but please keep them away from our farm animals. For alpaca walks, dogs are not allowed as they can make the alpacas nervous."
    },
    {
        question: "How much do the pumpkins cost?",
        answer: "Our pumpkins range from £2 to £12, from mini to XXL. We have a pricing table in the field so you can check the cost before you purchase."
    },
    {
        question: "What happens if it rains?",
        answer: "Our events go ahead in most weather conditions! We're all about embracing the great outdoors. In cases of extreme weather that pose a safety risk, we will contact you to reschedule."
    },
    {
        question: "Can I book for a large group or school visit?",
        answer: "Yes! For private group bookings or school visits, please email us at tbcpumpkinpatch@outlook.com to make arrangements."
    }
]


export function FaqAccordion() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
