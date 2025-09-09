
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { activities } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Phone, Mail, Sun, Gift, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Activity, ActivityType } from "@/lib/types";
import { AlpacaIcon } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Home() {
  const [activeTab, setActiveTab] = useState('pumpkin-picking');
  const pumpkinActivity = activities.find(a => a.slug === 'pumpkin-picking');
  const alpacaActivity = activities.find(a => a.slug === 'alpaca-walk');

  const ExperienceCard = ({ item, parentActivity }: { item: Activity | ActivityType, parentActivity?: Activity }) => {
    const activitySlug = parentActivity ? parentActivity.slug : (item as Activity).slug;
    const typeSlug = parentActivity ? (item as ActivityType).slug : undefined;
    
    let bookLink = `/book/${activitySlug}`;
    if (parentActivity && typeSlug) {
      bookLink = `/book/${parentActivity.slug}?type=${typeSlug}`;
    }

    const itemIcon = 'icon' in item ? item.icon : undefined;

    return (
       <Card className="bg-card border-border/50 overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-60 w-full">
            <Image
              src={item.image!}
              alt={item.title}
              fill
              data-ai-hint={item.aiHint}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1 relative flex flex-col">
            {itemIcon && <item.icon className="w-6 h-6 text-primary absolute top-6 right-6" />}
            <CardTitle className="font-headline text-2xl tracking-wider mb-2 pr-8">
              {item.title}
            </CardTitle>
            <CardDescription className="flex-1">{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 bg-transparent mt-auto">
           <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href={bookLink}>
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="flex flex-col flex-1 pt-0 -mt-24">
      <main className="flex-1 flex flex-col">
      <section className="relative flex flex-col items-center justify-center text-center p-4 min-h-screen text-white">
          <div className="absolute inset-0">
            <Image 
              src="/home.png"
              alt="The Black Cat Events entrance with pumpkin decorations"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-primary font-semibold mb-2">Welcome To Black Cat Events</p>
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 leading-tight">
              Discover the Spirit of Autumn
            </h1>
            <p className="max-w-2xl text-lg md:text-xl mb-8">
             Pumpkin picking, alpaca adventures, photo opportunities, and festive activities—everything you love about fall in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#experiences">
                  Book Your Experience
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="experiences" className="min-h-screen flex flex-col justify-center bg-background py-12 md:py-0">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold font-headline mb-2">Choose Your Experience</h2>
            <div className="flex justify-center mb-12">
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            <div className="flex justify-center mb-12">
              <div className="bg-muted p-1 rounded-full flex items-center space-x-1">
                <button
                  onClick={() => setActiveTab('pumpkin-picking')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                    activeTab === 'pumpkin-picking'
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-card/80"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <Sun className="h-5 w-5" />
                    Pumpkin Picking
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('alpaca-walk')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                    activeTab === 'alpaca-walk'
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-card/80"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <AlpacaIcon className="h-5 w-5" />
                    Alpaca Walks
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('gift-card')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                    activeTab === 'gift-card'
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-card/80"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <Gift className="h-5 w-5" />
                    Gift Cards
                  </div>
                </button>
              </div>
            </div>

            <div>
              {activeTab === 'pumpkin-picking' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {pumpkinActivity?.types?.map((type) => (
                      <ExperienceCard key={type.slug} item={type} parentActivity={pumpkinActivity} />
                    ))}
                </div>
              )}
              {activeTab === 'alpaca-walk' && (
                 <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        {alpacaActivity && <ExperienceCard item={alpacaActivity} />}
                    </div>
                 </div>
              )}
              {activeTab === 'gift-card' && (
                <div className="flex justify-center">
                  <div className="w-full md:w-2/3 lg:w-1/2">
                    <Card className="bg-card border-border/50 overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
                      <CardHeader className="p-0">
                        <div className="relative h-60 w-full">
                          <Image
                            src="https://picsum.photos/600/400"
                            alt="Gift Card"
                            fill
                            data-ai-hint="gift card present"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-1 relative flex flex-col">
                          <Gift className="w-6 h-6 text-primary absolute top-6 right-6" />
                          <CardTitle className="font-headline text-2xl tracking-wider mb-2 pr-8">
                            Gift Card
                          </CardTitle>
                          <CardDescription className="flex-1">The perfect gift for any occasion. Give the gift of a magical experience at Black Cat Bookings.</CardDescription>
                      </CardContent>
                      <CardFooter className="p-6 bg-transparent mt-auto">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                          <Link href="/gift-card">
                            Purchase Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 md:py-6 text-sm text-foreground border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 text-center md:text-left">
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Barn%2C+Mansant+Ganol%2C+Pontyates%2C+SA15+5RL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>The Barn, Mansant Ganol, Pontyates, SA15 5RL</span>
            </a>
            <a href="tel:07527303240" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              <span>07527 303240</span>
            </a>
            <a href="mailto:tbcpumpkinpatch@outlook.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span>tbcpumpkinpatch@outlook.com</span>
            </a>
        </div>
      </footer>
    </div>
  );
}
