"use client";

import * as Primitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";

import type { ComponentProps, FC } from "react";
import type { IBasicProps } from "@/interfaces/components.interfaces";

interface IItemProps extends ComponentProps<typeof Primitive.Item> {
    inset?: boolean;
    variant?: "default" | "destructive";
}

export const Root: FC<ComponentProps<typeof Primitive.Root>> = ({ ...props }) => (
    <Primitive.Root data-slot="dropdown-menu" {...props} />
)

export const Trigger: FC<ComponentProps<typeof Primitive.Trigger>> = ({ ...props }) => (
    <Primitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
)

export const Content: FC<ComponentProps<typeof Primitive.Content>> = ({ className, sideOffset,...props }) => (
    <Primitive.Portal>
        <Primitive.Content
            data-slot="dropdown-menu-content"
            sideOffset={sideOffset ?? 4}
            className={cn(
                `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out 
                data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 
                data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
                data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 
                max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] 
                origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md 
                border p-1 shadow-md`,
                className
            )}
            {...props}
        />
    </Primitive.Portal>
)

export const Group: FC<ComponentProps<typeof Primitive.Group>> = ({ ...props }) => (
    <Primitive.Group data-slot="dropdown-menu-group" {...props} />
)

export const Item: FC<IItemProps> = ({ className, inset, variant, ...props }) => (
    <Primitive.Item
        data-slot="dropdown-menu-item"
        data-inset={inset}
        data-variant={variant ?? "default"}
        className={cn(
            `focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive 
            data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 
            data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive 
            [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default lg:cursor-pointer items-center 
            gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none 
            data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 
            [&_svg:not([class*='size-'])]:size-4`,
            className
        )}
        {...props}
    />
)

export const Label: FC<ComponentProps<typeof Primitive.Label>> = ({ className, ...props }) => (
    <Primitive.Label
        data-slot="dropdown-menu-label"
        className={cn(
            "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            className
        )}
        {...props}
    />
)

export const Separator: FC<IBasicProps> = ({ className }) => (
    <hr 
        data-slot="dropdown-menu-separator"
        className={cn("bg-border -mx-1 my-1 h-px", className)}
    />
)
