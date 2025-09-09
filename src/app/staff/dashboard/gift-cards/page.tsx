
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { allGiftCardPurchases } from "@/app/staff/data";
import { format } from 'date-fns';
import { Gift, User, Mail, Calendar, MessageSquare } from "lucide-react";

export default function StaffGiftCardPage() {

  const sortedGiftCards = allGiftCardPurchases.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center gap-4">
        <Gift className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">Gift Card Sales</h1>
          <p className="text-foreground/80">A log of all gift cards purchased.</p>
        </div>
      </div>
      
       <Card>
            <CardHeader>
              <CardTitle>All Purchases</CardTitle>
                <CardDescription>
                  {sortedGiftCards.length} gift cards sold
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Message</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedGiftCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>
                          <div className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {card.recipientName}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                             <Mail className="h-4 w-4 text-muted-foreground" />
                            {card.recipientEmail}
                          </div>
                        </TableCell>
                        <TableCell>
                           <div className="font-medium flex items-center gap-2">
                             <User className="h-4 w-4 text-muted-foreground" />
                             {card.senderName}
                           </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                           <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                {format(card.purchaseDate, 'dd/MM/yyyy')}
                           </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate">
                           {card.message ? (
                             <div className="flex items-start gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                                <span className="italic">"{card.message}"</span>
                             </div>
                           ) : (
                                <span className="text-muted-foreground/70">No message</span>
                           )}
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          £{card.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
    </div>
  )
}
