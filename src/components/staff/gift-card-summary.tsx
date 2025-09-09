
'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, ChevronRight } from "lucide-react"

interface GiftCardSummaryProps {
    count: number;
}

export function GiftCardSummary({ count }: GiftCardSummaryProps) {
  return (
    <Link href="/staff/dashboard/gift-cards" className="block hover:shadow-lg transition-shadow rounded-lg">
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Gift Cards Sold
                </CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <span>View details</span>
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                Total gift cards purchased
                </p>
            </CardContent>
        </Card>
    </Link>
  )
}
