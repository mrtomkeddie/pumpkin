
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Sun, Gift } from "lucide-react"
import { AlpacaIcon } from "../icons";
import { Separator } from "../ui/separator";

interface SalesSummaryProps {
    totalSales: number;
    pumpkinSales: number;
    alpacaSales: number;
    giftCardSales: number;
}

export function SalesSummary({ totalSales, pumpkinSales, alpacaSales, giftCardSales }: SalesSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  return (
    <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Sales Overview
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           <div className="text-2xl font-bold mb-4">{formatCurrency(totalSales)}</div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold">{formatCurrency(pumpkinSales)}</p>
                        <p className="text-xs text-muted-foreground">Pumpkin Picking</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <AlpacaIcon className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold">{formatCurrency(alpacaSales)}</p>
                        <p className="text-xs text-muted-foreground">Alpaca Walks</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold">{formatCurrency(giftCardSales)}</p>
                        <p className="text-xs text-muted-foreground">Gift Cards</p>
                    </div>
                </div>
           </div>
        </CardContent>
    </Card>
  )
}
