
'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

interface SalesSummaryProps {
    totalSales: number;
    estimatedProfit: number;
}

export function SalesSummary({ totalSales, estimatedProfit }: SalesSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  return (
    <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Sales Overview
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
                    <p className="text-xs text-muted-foreground">
                        Total Sales (Bookings + Gift Cards)
                    </p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{formatCurrency(estimatedProfit)}</p>
                    <p className="text-xs text-muted-foreground">
                        Est. Profit (60% Margin)
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}
