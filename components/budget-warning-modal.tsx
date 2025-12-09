"use client"

import { AlertTriangle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BudgetWarningModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estimatedCost: number
  currentSpent: number
  limit: number
  onProceed: () => void
  onCancel: () => void
}

export function BudgetWarningModal({
  open,
  onOpenChange,
  estimatedCost,
  currentSpent,
  limit,
  onProceed,
  onCancel
}: BudgetWarningModalProps) {
  
  const wouldExceed = (currentSpent + estimatedCost) > limit
  const percentUsed = ((currentSpent + estimatedCost) / limit) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${wouldExceed ? 'bg-red-100' : 'bg-yellow-100'}`}>
              {wouldExceed ? (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              ) : (
                <DollarSign className="h-6 w-6 text-yellow-600" />
              )}
            </div>
            <div>
              <DialogTitle className={wouldExceed ? "text-red-600" : "text-yellow-600"}>
                {wouldExceed ? "Budget Limit Exceeded" : "High Cost Warning"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cost Breakdown */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">This Request:</span>
              <span className="font-semibold">${estimatedCost.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Already Spent:</span>
              <span>${currentSpent.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">New Total:</span>
              <span className={`font-bold ${wouldExceed ? 'text-red-600' : 'text-yellow-600'}`}>
                ${(currentSpent + estimatedCost).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Limit:</span>
              <span>${limit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Budget Used:</span>
              <span className={wouldExceed ? 'text-red-600' : 'text-yellow-600'}>
                {percentUsed.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Warning Message */}
          <DialogDescription>
            {wouldExceed ? (
              <>
                <strong>This request will exceed your budget limit.</strong>
                <br /><br />
                You'll need to increase your limit or wait until your budget resets.
              </>
            ) : (
              <>
                This request will use a significant portion of your remaining budget.
                <br /><br />
                <strong>Estimated cost: ${estimatedCost.toFixed(4)}</strong>
              </>
            )}
          </DialogDescription>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel Request
          </Button>
          <Button
            onClick={onProceed}
            disabled={wouldExceed}
            className={`flex-1 ${wouldExceed ? '' : 'bg-yellow-600 hover:bg-yellow-700'}`}
          >
            {wouldExceed ? 'Cannot Proceed' : 'Proceed Anyway'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}






