
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Gift, CreditCard, User, Mail, MessageSquare, Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const giftCardAmounts = ['5', '10', '20', '30', '50', '100', '200'];

const GiftCardFormSchema = z.object({
  amount: z.string({ required_error: 'Please select an amount.' }),
  customAmount: z.number().optional(),
  recipientName: z.string().min(1, 'Recipient name is required.'),
  recipientEmail: z.string().email('Please enter a valid email.'),
  senderName: z.string().min(1, 'Your name is required.'),
  message: z.string().optional(),
});

type GiftCardFormValues = z.infer<typeof GiftCardFormSchema>;

export default function GiftCardPage() {
  const { toast } = useToast();
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const form = useForm<GiftCardFormValues>({
    resolver: zodResolver(GiftCardFormSchema),
  });

  const handleAmountChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomAmount(true);
      form.setValue('amount', 'custom');
    } else {
      setIsCustomAmount(false);
      form.setValue('amount', value);
      form.unregister('customAmount');
    }
  };

  function onSubmit(data: GiftCardFormValues) {
    const finalAmount = isCustomAmount ? data.customAmount : `£${data.amount}`;
    toast({
      title: "Gift Card Purchase Successful!",
      description: `You've purchased a ${finalAmount} gift card for ${data.recipientName}.`,
    });
    form.reset();
    setIsCustomAmount(false);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Gift className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-4xl">Purchase a Gift Card</CardTitle>
              <CardDescription>The perfect gift for any occasion.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Amount</FormLabel>
                        <Select onValueChange={handleAmountChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an amount" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {giftCardAmounts.map((amount) => (
                              <SelectItem key={amount} value={amount}>
                                £{amount} gift card
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">Custom amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isCustomAmount && (
                     <FormField
                        control={form.control}
                        name="customAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2"><Edit className="h-5 w-5 text-primary" /> Custom Amount (£)</FormLabel>
                             <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                             </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  )}


                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Recipient's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Recipient's Email</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-8">
                   <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Message (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add a personal message to your gift card"
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>


              <Button type="submit" size="lg" className="w-full mt-8">
                <CreditCard className="mr-2 h-5 w-5" /> Proceed to Payment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
