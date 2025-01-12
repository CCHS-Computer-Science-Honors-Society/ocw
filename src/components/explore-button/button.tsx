"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '../ui/button';
import { Slot } from '@radix-ui/react-slot';
import { useExplore } from './context';


export const ExploreButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { setIsOpen, isOpen } = useExplore()

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}

        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
        {...props}
      />
    );
  },
);

ExploreButton.displayName = "ExploreButton";
