import * as React from "react";
import {
  Tooltip as RechartsTooltip,
  type TooltipProps as RechartsTooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

// Extra props for customization
interface ExtraTooltipProps {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  labelClassName?: string;
  className?: string;
  color?: string;
  formatter?: (
    value: any,
    name: string,
    item: any,
    index: number
  ) => React.ReactNode;
  labelFormatter?: (label: any) => React.ReactNode;
}

// Recharts payload item type
interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, any>;
}

// Merge Recharts props + custom props
interface CustomTooltipProps extends ExtraTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

// Export default Tooltip for convenience
export const ChartTooltip = RechartsTooltip;

// ForwardRef component for custom tooltip content
export const ChartTooltipContent = React.forwardRef<HTMLDivElement, CustomTooltipProps>(
  (
    {
      active,
      payload = [],
      label,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    if (!active || !payload.length) return null;

    const tooltipLabel = (labelKey && payload[0]?.payload?.[labelKey]) ?? label;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!hideLabel && (
          <div className={cn("font-medium text-foreground", labelClassName)}>
            {labelFormatter ? labelFormatter(tooltipLabel) : tooltipLabel}
          </div>
        )}

        <div className="grid gap-1">
          {payload.map((item: TooltipPayloadItem, index: number) => {
            const indicatorColor = color ?? item.color;

            return (
              <div key={index} className="flex items-center gap-2">
                {!hideIndicator &&
                  (indicator === "dot" ? (
                    <div
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: indicatorColor }}
                    />
                  ) : (
                    <div
                      className={cn(
                        "shrink-0 rounded-[2px] border-[1.5px] border-dashed border-muted-foreground",
                        indicator === "dashed" ? "h-2.5 w-2.5" : "h-2 w-2"
                      )}
                    />
                  ))}

                <div className="flex flex-1 justify-between gap-4 leading-none text-muted-foreground">
                  <span className="truncate">
                    {nameKey ? item.payload?.[nameKey] : item.name}
                  </span>
                  <span className="font-mono font-medium text-foreground">
                    {formatter
                      ? formatter(item.value, item.name ?? "", item.payload, index)
                      : item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

export {};
