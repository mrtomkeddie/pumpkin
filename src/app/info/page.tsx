
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Info } from "lucide-react";

const faqs = [
    {
        question: "Do I need to book in advance?",
        answer: "Yes, all activities must be booked in advance through our website to guarantee your spot, especially for alpaca walks which have limited availability."
    },
    {
        question: "What should I wear?",
        answer: "We are a working farm, so we strongly recommend wearing wellies or sturdy boots, especially after rain. Dress for the weather, as most activities are outdoors. Layers are always a good idea!"
    },
    {
        question: "Is there parking available?",
        answer: "Yes, there is free parking available on-site. For pumpkin picking, one ticket covers one car, so please carpool if possible."
    },
    {
        question: "Can I bring my dog?",
        answer: "Unfortunately, we cannot allow dogs (except for registered assistance dogs) in the pumpkin patch or on alpaca walks to ensure the safety and comfort of our farm animals."
    },
    {
        question: "What happens if it rains?",
        answer: "Our events go ahead in most weather conditions! We're all about embracing the great outdoors. In cases of extreme weather that pose a safety risk, we will contact you to reschedule."
    },
    {
        question: "Are there toilets on site?",
        answer: "Yes, we have toilet facilities available for all our visitors."
    },
    {
        question: "Is the site accessible for wheelchairs or pushchairs?",
        answer: "As a working farm, the terrain can be uneven and muddy, which may be challenging for some wheelchairs and pushchairs. The pumpkin patch is on a field, but we do our best to make it as accessible as possible."
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
