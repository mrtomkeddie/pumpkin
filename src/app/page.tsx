
'use client';

import Link from "next/link";
import Image from "next/image";
import { activities } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 bg-background h-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(var(--primary-rgb),0.1),_transparent_40%)] -z-10" />
          
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="The Black Cat Pumpkin Patch Logo"
              width={500}
              height={116.5}
              priority
            />
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Pingle Lane, Pingle</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Daily: 10:00am - 9:00pm</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>0116 234 5678</span>
              </div>
            </div>
            <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#experiences">
                Book Your Experience <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold font-headline mb-2">Choose Your Experience</h2>
            <div className="flex justify-center mb-12">
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {activities.map((activity) => (
                <Card key={activity.slug} className="bg-card border-border/50 overflow-hidden group">
                  <CardHeader className="p-0">
                    <div className="relative h-60 w-full">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        data-ai-hint={activity.aiHint}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-headline text-2xl tracking-wider mb-2 flex items-center justify-between">
                      {activity.title}
                      <activity.icon className="w-6 h-6 text-primary" />
                    </CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 bg-transparent">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href={`/book/${activity.slug}`}>
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-6 text-sm text-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Pingle Farm. All rights reserved.</p>
        <Link href="/gift-card" className="hover:text-primary transition-colors mt-2 inline-block">Gift Cards</Link>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes gradient-x {
            0%, 100% {
                background-size: 200% 200%;
                background-position: left center;
            }
            50% {
                background-size: 200% 200%;
                background-position: right center;
            }
        }
        .animate-gradient-x {
            animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
