
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Info } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";

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
                 <FaqAccordion />
            </div>
        </div>

    </div>
  );
}
