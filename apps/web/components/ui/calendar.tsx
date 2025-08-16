"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { type DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
  "bg-gradient-to-br from-primary via-primary to-secondary/30 group/calendar p-8 rounded-2xl border-2 border-accent/40 shadow-2xl backdrop-blur-md [--cell-size:3rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/5 before:via-transparent before:to-secondary/10 before:rounded-2xl before:pointer-events-none",
  'after:absolute after:inset-0 after:bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23C08552" fillOpacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] after:rounded-2xl after:pointer-events-none',
        // Enhanced RTL support
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("tr", { month: "long" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit relative", defaultClassNames.root),
        months: cn("flex gap-8 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-8", defaultClassNames.month),
        nav: cn("flex items-center gap-3 w-full absolute top-0 inset-x-0 justify-between z-10", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[var(--cell-size)] w-[var(--cell-size)] aria-disabled:opacity-30 p-0 select-none transition-all duration-500 ease-out rounded-xl border-2 border-accent/30 bg-gradient-to-br from-primary to-secondary/50 backdrop-blur-sm shadow-xl",
          "hover:bg-gradient-to-br hover:from-accent/20 hover:to-accent/10 hover:text-accent hover:scale-125 hover:shadow-2xl hover:border-accent/60 hover:rotate-[-5deg]",
          "active:scale-110 active:rotate-0 focus:ring-4 focus:ring-accent/30 focus:outline-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[var(--cell-size)] w-[var(--cell-size)] aria-disabled:opacity-30 p-0 select-none transition-all duration-500 ease-out rounded-xl border-2 border-accent/30 bg-gradient-to-br from-primary to-secondary/50 backdrop-blur-sm shadow-xl",
          "hover:bg-gradient-to-br hover:from-accent/20 hover:to-accent/10 hover:text-accent hover:scale-125 hover:shadow-2xl hover:border-accent/60 hover:rotate-[5deg]",
          "active:scale-110 active:rotate-0 focus:ring-4 focus:ring-accent/30 focus:outline-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-[var(--cell-size)] w-full px-[var(--cell-size)] font-playfair font-bold text-2xl text-text tracking-wide",
          "bg-gradient-to-r from-transparent via-accent/10 to-transparent py-2 rounded-lg",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-[var(--cell-size)] gap-3",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-accent border-2 border-accent/40 shadow-2xl has-focus:ring-accent/50 has-focus:ring-4 rounded-xl bg-gradient-to-br from-primary to-secondary/30 backdrop-blur-md transition-all duration-300",
          "hover:shadow-2xl hover:border-accent/60 hover:scale-105",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("absolute bg-popover inset-0 opacity-0 rounded-xl", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-playfair font-bold text-text tracking-wide",
          captionLayout === "label"
            ? "text-2xl bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
            : "rounded-xl pl-4 pr-3 flex items-center gap-3 text-lg h-12 bg-gradient-to-r from-accent/15 to-secondary/15 hover:from-accent/25 hover:to-secondary/25 transition-all duration-300 border border-accent/30 shadow-lg [&>svg]:text-accent [&>svg]:size-5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse mt-6",
        weekdays: cn("flex mb-4 gap-1", defaultClassNames.weekdays),
        weekday: cn(
          "text-neutral/90 rounded-xl flex-1 font-bold text-sm select-none py-3 text-center uppercase tracking-widest font-playfair",
          "bg-gradient-to-br from-secondary/20 to-accent/10 border border-accent/20 shadow-sm",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full gap-1 mb-1", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-[var(--cell-size)] font-bold text-neutral/70 font-playfair",
          defaultClassNames.week_number_header,
        ),
        week_number: cn("text-sm select-none text-neutral/70 font-bold font-playfair", defaultClassNames.week_number),
        day: cn(
          "relative w-full h-full p-0.5 text-center group/day aspect-square select-none",
          "[&:first-child[data-selected=true]_button]:rounded-l-xl",
          "[&:last-child[data-selected=true]_button]:rounded-r-xl",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-xl bg-gradient-to-r from-accent via-accent to-accent/95 text-white shadow-2xl border-2 border-accent/50",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "rounded-none bg-gradient-to-r from-accent/30 to-accent/20 text-text border-y-2 border-accent/30",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          "rounded-r-xl bg-gradient-to-l from-accent via-accent to-accent/95 text-white shadow-2xl border-2 border-accent/50",
          defaultClassNames.range_end,
        ),
        today: cn(
          "bg-gradient-to-br from-accent/50 to-accent/30 text-text font-bold rounded-xl border-3 border-accent/70 shadow-xl data-[selected=true]:rounded-xl data-[selected=true]:border-accent ring-4 ring-accent/25",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent before:rounded-xl before:pointer-events-none",
          defaultClassNames.today,
        ),
        outside: cn("text-neutral/25 aria-selected:text-neutral/40", defaultClassNames.outside),
        disabled: cn("text-neutral/15 opacity-20 cursor-not-allowed", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn("relative", className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn(
                  "size-6 transition-all duration-500 group-hover:scale-150 text-accent drop-shadow-sm",
                  className,
                )}
                {...props}
              />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn(
                  "size-6 transition-all duration-500 group-hover:scale-150 text-accent drop-shadow-sm",
                  className,
                )}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon
              className={cn(
                "size-6 transition-all duration-500 group-hover:scale-150 text-accent drop-shadow-sm",
                className,
              )}
              {...props}
            />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center text-center font-bold text-neutral/70 font-playfair">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative overflow-hidden transition-all duration-500 ease-out font-bold font-inter text-text rounded-xl border border-transparent",
        "bg-gradient-to-br from-primary/80 to-secondary/20 backdrop-blur-sm",
  "hover:bg-gradient-to-br hover:from-accent/25 hover:to-accent/15 hover:text-text hover:scale-125 hover:shadow-2xl hover:z-20 hover:border-accent/50 hover:border-2 hover:rotate-1",
        "active:scale-110 active:rotate-0 active:transition-transform active:duration-200",
  "focus:ring-4 focus:ring-accent/40 focus:outline-none focus:border-accent",
        // Selected single day styling
  "data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-accent data-[selected-single=true]:via-accent data-[selected-single=true]:to-accent/90",
        "data-[selected-single=true]:text-white data-[selected-single=true]:font-black data-[selected-single=true]:shadow-2xl data-[selected-single=true]:scale-125 data-[selected-single=true]:border-3 data-[selected-single=true]:border-white/30 data-[selected-single=true]:z-30",
        // Range styling
  "data-[range-middle=true]:bg-gradient-to-r data-[range-middle=true]:from-accent/30 data-[range-middle=true]:to-accent/20 data-[range-middle=true]:text-text data-[range-middle=true]:border-y-2 data-[range-middle=true]:border-accent/30",
  "data-[range-start=true]:bg-gradient-to-r data-[range-start=true]:from-accent data-[range-start=true]:to-accent/90 data-[range-start=true]:text-white data-[range-start=true]:font-black data-[range-start=true]:shadow-2xl data-[range-start=true]:scale-110",
  "data-[range-end=true]:bg-gradient-to-l data-[range-end=true]:from-accent data-[range-end=true]:to-accent/90 data-[range-end=true]:text-white data-[range-end=true]:font-black data-[range-end=true]:shadow-2xl data-[range-end=true]:scale-110",
        // Focus and interaction states
  "group-data-[focused=true]/day:border-accent group-data-[focused=true]/day:ring-accent/50",
        "dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-30 group-data-[focused=true]/day:ring-4",
        "data-[range-end=true]:rounded-xl data-[range-end=true]:rounded-r-xl",
        "data-[range-middle=true]:rounded-none",
        "data-[range-start=true]:rounded-xl data-[range-start=true]:rounded-l-xl",
        // Enhanced hover effects with luxury animations
  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/20 before:via-accent/10 before:to-transparent before:opacity-0 before:transition-all before:duration-500 before:rounded-xl before:scale-75",
        "hover:before:opacity-100 hover:before:scale-110 hover:before:rotate-180",
        // Selected day overlay effects
        "data-[selected-single=true]:after:absolute data-[selected-single=true]:after:inset-0 data-[selected-single=true]:after:bg-gradient-to-br data-[selected-single=true]:after:from-white/30 data-[selected-single=true]:after:via-white/10 data-[selected-single=true]:after:to-transparent data-[selected-single=true]:after:rounded-xl data-[selected-single=true]:after:pointer-events-none",
        // Sparkle effect for selected days
        'data-[selected-single=true]:before:absolute data-[selected-single=true]:before:inset-0 data-[selected-single=true]:before:bg-[url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fillOpacity="0.3"%3E%3Cpolygon points="10,1 4,7 10,13 16,7"/%3E%3C/g%3E%3C/svg%3E\')] data-[selected-single=true]:before:rounded-xl data-[selected-single=true]:before:pointer-events-none data-[selected-single=true]:before:animate-pulse',
        "[&>span]:text-xs [&>span]:opacity-80 [&>span]:font-medium",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
