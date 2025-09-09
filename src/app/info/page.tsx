
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Info } from "lucide-react";

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

export default function InfoPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
            <Info className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-4xl font-headline font-bold">Information & FAQ</h1>
              <p className="text-foreground/80">Find answers to common questions and how to get in touch.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        <CardDescription>We're here to help with any questions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <a
                        href="https://www.google.com/maps/search/?api=1&query=The+Barn%2C+Mansant+Ganol%2C+Pontyates%2C+SA15+5RL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 hover:text-primary transition-colors group"
                        >
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold">The Barn, Mansant Ganol</p>
                                <p>Pontyates, SA15 5RL</p>
                            </div>
                        </a>
                        <a href="tel:07527303240" className="flex items-center gap-4 hover:text-primary transition-colors">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>07527 303240</span>
                        </a>
                        <a href="mailto:tbcpumpkinpatch@outlook.com" className="flex items-center gap-4 hover:text-primary transition-colors">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>tbcpumpkinpatch@outlook.com</span>
                        </a>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <h2 className="text-2xl font-headline font-bold mb-4">Frequently Asked Questions</h2>
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
            </div>
        </div>

    </div>
  );
}
