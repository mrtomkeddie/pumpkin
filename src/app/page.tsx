import Link from "next/link";
import Image from "next/image";
import { activities } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold text-primary mb-2">
          A Mystical Autumn Adventure
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to Black Cat Bookings. Discover the magic of the season with our unique pumpkin patch experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {activities.map((activity) => (
          <Card key={activity.slug} className="flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  data-ai-hint={activity.aiHint}
                  className="object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-4 left-4">
                  <activity.icon className="h-10 w-10 text-white/80" />
                 </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <CardTitle className="font-headline text-2xl mb-2">{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/book/${activity.slug}`}>
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
