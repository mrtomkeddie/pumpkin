
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift } from "lucide-react"

interface GiftCardSummaryProps {
    count: number;
}

export function GiftCardSummary({ count }: GiftCardSummaryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Gift Cards Sold
        </CardTitle>
        <Gift className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          Total gift cards purchased
        </p>
      </CardContent>
    </Card>
  )
}
