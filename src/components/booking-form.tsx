
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Calendar as CalendarIcon, Clock, Users, Sun, Moon, Mic2, User, Mail, Phone, Minus, Plus, Info } from 'lucide-react';

import { useReservations } from '@/context/reservations-context';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Activity, ActivityType } from '@/lib/types';
import { Separator } from './ui/separator';

const dayTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const moonlitTimes = ['19:00', '20:00'];
const pumpkinTimes = ['15:00', '16:00', '17:00'];
const alpacaTimes = ['11:00', '13:00'];

const currentYear = new Date().getFullYear();

const moonlitDates = [
  new Date(currentYear, 9, 10), // Oct 10
  new Date(currentYear, 9, 11), // Oct 11
  new Date(currentYear, 9, 17), // Oct 17
  new Date(currentYear, 9, 18), // Oct 18
  new Date(currentYear, 9, 24), // Oct 24
  new Date(currentYear, 9, 25), // Oct 25
].map(d => d.setHours(0,0,0,0));

const quietDates = [
    new Date(currentYear, 9, 15),
    new Date(currentYear, 9, 16),
    new Date(currentYear, 9, 17),
    new Date(currentYear, 9, 22),
    new Date(currentYear, 9, 23),
    new Date(currentYear, 9, 24),
].map(d => d.setHours(0,0,0,0));

const pumpkinAvailableDates = [
    11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 30
].map(day => new Date(currentYear, 9, day).setHours(0,0,0,0));

const alpacaAvailableDates = [
  15, 16, 17, 22, 23, 24
].map(day => new Date(2025, 9, day).setHours(0,0,0,0));

const alpacaPackagesSchema = z.record(z.string(), z.number().min(0).max(6));

const BookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  date: z.date({
    required_error: 'A date is required.',
  }),
  time: z.string({
    required_error: 'Please select a time.',
  }),
  activityType: z.string().optional(),
  packages: alpacaPackagesSchema.optional(),
}).refine(data => {
  if (data.activityType === 'alpaca-walk' || (data.packages && Object.keys(data.packages).length > 0)) {
    const total = Object.values(data.packages || {}).reduce((acc, curr) => acc + curr, 0);
    return total > 0;
  }
  return true;
}, {
  message: 'Please select at least one package.',
  path: ['packages'],
});


type BookingFormValues = z.infer<typeof BookingFormSchema>;

interface BookingFormProps {
  activity: Activity;
  activityTypeSlug?: string;
  onBookingConfirmed: () => void;
}

export function BookingForm({ activity, activityTypeSlug, onBookingConfirmed }: BookingFormProps) {
  const router = useRouter();
  const { addReservation } = useReservations();

  const defaultPackages = activity.slug === 'alpaca-walk' 
    ? activity.types?.reduce((acc, type) => {
        acc[type.slug] = 0;
        return acc;
      }, {} as Record<string, number>)
    : undefined;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      activityType: activityTypeSlug || (activity.slug === 'pumpkin-picking' ? activity.types?.[0].slug : undefined),
      packages: defaultPackages,
    }
  });

  const watchedActivityType = form.watch('activityType');
  const watchedPackages = form.watch('packages');

  const getInitialTimes = () => {
    if (activity.slug === 'pumpkin-picking') {
        const isMoonlit = activityTypeSlug === 'moonlit';
        return isMoonlit ? moonlitTimes : pumpkinTimes;
    }
    if (activity.slug === 'alpaca-walk') {
      return alpacaTimes;
    }
    return dayTimes;
  }

  const [availableTimes, setAvailableTimes] = useState<string[]>(getInitialTimes());

  useEffect(() => {
    let newTimes: string[];
    if (activity.slug === 'pumpkin-picking') {
        const isMoonlit = watchedActivityType === 'moonlit';
        
        newTimes = isMoonlit ? moonlitTimes : pumpkinTimes;
    } else if (activity.slug === 'alpaca-walk') {
        newTimes = alpacaTimes;
    } else {
        newTimes = dayTimes;
    }
    setAvailableTimes(newTimes);

    const currentTime = form.getValues('time');
    if (currentTime && !newTimes.includes(currentTime)) {
      form.setValue('time', '');
    }

    if (activity.slug === 'pumpkin-picking') {
        const currentDate = form.getValues('date');
        if (currentDate) {
            const currentDateOnly = new Date(currentDate).setHours(0,0,0,0);
            const isMoonlit = watchedActivityType === 'moonlit';
            const isQuiet = watchedActivityType === 'quiet';
            if (isMoonlit && !moonlitDates.includes(currentDateOnly)) {
                form.setValue('date', undefined as any);
            } else if (isQuiet && !quietDates.includes(currentDateOnly)) {
                form.setValue('date', undefined as any);
            } else if (!isMoonlit && !isQuiet && (moonlitDates.includes(currentDateOnly) || quietDates.includes(currentDateOnly))) {
                form.setValue('date', undefined as any);
            }
        }
    }
  }, [watchedActivityType, form, activity.slug]);
  
  const isPumpkinBooking = activity.slug === 'pumpkin-picking';
  const isAlpacaBooking = activity.slug === 'alpaca-walk';
  const selectedActivityType = activity.types?.find(t => t.slug === watchedActivityType);

  const alpacaTotalPeople = isAlpacaBooking && watchedPackages ?
    Object.entries(watchedPackages).reduce((total, [slug, quantity]) => {
      const packageType = activity.types?.find(t => t.slug === slug);
      return total + (quantity * (packageType?.pax || 0));
    }, 0) : 0;

  function onSubmit(data: BookingFormValues) {
    if (isAlpacaBooking) {
      const packages = Object.entries(data.packages || {})
        .filter(([, quantity]) => quantity > 0)
        .map(([slug, quantity]) => {
          const type = activity.types!.find(t => t.slug === slug)!;
          return { slug, title: type.title, quantity };
        });

      addReservation({
        activityTitle: activity.title,
        activitySlug: activity.slug,
        packages,
        date: data.date,
        time: data.time,
        name: data.name,
        email: data.email,
        phone: data.phone,
        quantity: alpacaTotalPeople
      });
    } else {
      const activityType = activity.types?.find(t => t.slug === data.activityType)?.title;
      addReservation({
        activityTitle: activity.title,
        activitySlug: activity.slug,
        activityType: activityType,
        date: data.date,
        time: data.time,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
    onBookingConfirmed();
    router.push('/reservations');
  }

  const TypeIcon = ({ slug }: { slug?: string }) => {
    if (!slug) return <Users className="h-5 w-5 text-primary" />;
    switch (slug) {
        case 'day': return <Sun className="h-5 w-5 text-primary" />;
        case 'quiet': return <Mic2 className="h-5 w-5 text-primary" />;
        case 'moonlit': return <Moon className="h-5 w-5 text-primary" />;
        default: return <Users className="h-5 w-5 text-primary" />;
    }
  };

  const handlePackageQuantityChange = (slug: string, newQuantity: number) => {
    const currentPackages = form.getValues('packages') || {};
    const currentQuantity = currentPackages[slug] || 0;
    
    // Calculate the change in total people
    const packageType = activity.types?.find(t => t.slug === slug);
    const paxPerPackage = packageType?.pax || 0;
    const peopleChange = (newQuantity - currentQuantity) * paxPerPackage;
  
    if (alpacaTotalPeople + peopleChange <= 6) {
      form.setValue(`packages.${slug}`, newQuantity, { shouldValidate: true });
    }
  };

  const selectedPumpkinType = isPumpkinBooking ? activity.types?.find(t => t.slug === activityTypeSlug) : null;

  return (
    <div className="pt-8">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{activity.title}</CardTitle>
          <CardDescription>Select your preferred package(s), date, and time for this magical experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Your Details
                  </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><User className="h-4 w-4" /> Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Contact Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {isPumpkinBooking && selectedPumpkinType && (
                <div className="space-y-4">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    <TypeIcon slug={selectedPumpkinType.slug} />
                    Your Selected Experience
                  </FormLabel>
                  <Card className="bg-popover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-base">{selectedPumpkinType.title}</span>
                        <span className="font-bold text-primary">{selectedPumpkinType.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{selectedPumpkinType.description}</p>
                      <p className="text-xs font-semibold text-muted-foreground mt-2">{selectedPumpkinType.details}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {isAlpacaBooking && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Important Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-to-expect">
                        <AccordionTrigger>What to Expect</AccordionTrigger>
                        <AccordionContent>
                           <div className="text-sm text-muted-foreground space-y-4">
                            <p>Your adventure begins the moment you arrive! Our team will welcome you at the car park and introduce you to the stars of the show: our three friendly alpacas. You might even meet some of our other barnyard pals, like the goats who love to tag along.</p>
                            <p>After a quick meet-and-greet, you'll choose your walking companion and we'll set off on a scenic one-mile trek through picturesque Welsh fields. Once the walk is complete, you'll get to reward your new furry friend with some well-deserved treats.</p>
                            <p><strong>A quick tip:</strong> Welsh weather is wonderfully unpredictable, so please bring your wellies and dress for the day! If you'd prefer to just come along for the scenery, spectator tickets are also available.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="package-options">
                        <AccordionTrigger>Package Options & Rules</AccordionTrigger>
                        <AccordionContent>
                           <div className="text-sm text-muted-foreground space-y-4">
                            <p>We can take a maximum of 6 people per walk. We have 3 alpacas, so if your group has more than 3 people, some will need to share an alpaca. Please select the "Shared Alpaca" ticket in this case.</p>
                            <p>The minimum age for a solo walk is 10. Younger children must be accompanied by a supervising adult.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )}

              {isAlpacaBooking && activity.types && (
                <div className="space-y-4">
                   <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                     Choose Packages (Max 6 people)
                   </FormLabel>
                   <div className='space-y-4'>
                    {activity.types.map((type) => (
                       <Controller
                         key={type.slug}
                         control={form.control}
                         name={`packages.${type.slug}` as const}
                         render={({ field }) => (
                          <Card className='bg-popover'>
                            <CardContent className='p-4 flex items-center justify-between'>
                              <div className='flex-1 pr-4'>
                                <p className='font-bold'>{type.title}</p>
                                <p className='text-sm text-muted-foreground mt-1'>{type.description}</p>
                                <p className='text-xs text-muted-foreground font-semibold mt-2'>{type.details}</p>
                              </div>
                              <div className='flex items-center gap-4'>
                                <span className="font-bold text-primary text-lg">{type.price}</span>
                                <div className='flex items-center gap-2'>
                                  <Button 
                                    type="button" 
                                    size="icon" 
                                    variant="outline"
                                    className='h-8 w-8'
                                    onClick={() => handlePackageQuantityChange(type.slug, Math.max(0, (field.value || 0) - 1))}
                                    disabled={!field.value || field.value === 0}
                                  >
                                    <Minus className='h-4 w-4' />
                                  </Button>
                                  <span className='text-lg font-bold w-6 text-center'>{field.value || 0}</span>
                                  <Button 
                                    type="button" 
                                    size="icon" 
                                    variant="outline"
                                    className='h-8 w-8'
                                    onClick={() => handlePackageQuantityChange(type.slug, (field.value || 0) + 1)}
                                    disabled={alpacaTotalPeople >= 6 || (alpacaTotalPeople + (activity.types.find(t=>t.slug===type.slug)?.pax ?? 1) -1) >= 6}
                                  >
                                    <Plus className='h-4 w-4' />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                         )}
                        />
                    ))}
                  </div>
                  {form.formState.errors.packages && (
                     <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{form.formState.errors.packages.message}</AlertDescription>
                    </Alert>
                  )}
                  {alpacaTotalPeople > 0 && (
                     <Alert className="mt-4">
                        <AlertDescription className='font-bold text-right'>
                            Total People: {alpacaTotalPeople} / 6
                        </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-semibold flex items-center gap-2 mb-2"><CalendarIcon className="h-6 w-6 text-primary" /> Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal h-11',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            defaultMonth={isPumpkinBooking ? new Date(new Date().getFullYear(), 9) : (isAlpacaBooking ? new Date(2025, 9) : undefined)}
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0,0,0,0);
                                if (date < today && activity.slug !== 'alpaca-walk') return true;

                                const dateOnly = new Date(date).setHours(0,0,0,0);

                                if (activity.slug === 'pumpkin-picking') {
                                    if (!pumpkinAvailableDates.includes(dateOnly)) {
                                        return true;
                                    }
                                    const isMoonlitType = watchedActivityType === 'moonlit';
                                    const isQuietType = watchedActivityType === 'quiet';

                                    const isMoonlitDate = moonlitDates.includes(dateOnly);
                                    const isQuietDate = quietDates.includes(dateOnly);

                                    if (isMoonlitType) {
                                        return !isMoonlitDate;
                                    } else if (isQuietType) {
                                        return !isQuietDate;
                                    } else {
                                        return isMoonlitDate || isQuietDate;
                                    }
                                } else if (activity.slug === 'alpaca-walk') {
                                    return !alpacaAvailableDates.includes(dateOnly);
                                }
                                return false;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-semibold flex items-center gap-2 mb-2"><Clock className="h-6 w-6 text-primary" /> Time</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                        >
                          {availableTimes.map((time) => (
                            <FormItem key={time}>
                              <FormControl>
                                <RadioGroupItem value={time} id={time} className="sr-only" />
                              </FormControl>
                              <FormLabel
                                htmlFor={time}
                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary h-11"
                              >
                                {time}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex mt-8 p-0">
                <Button type="submit" size="lg" className="w-full">
                  Confirm Booking
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    