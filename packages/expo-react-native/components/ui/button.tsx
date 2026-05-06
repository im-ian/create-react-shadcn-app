import { forwardRef } from "react";
import {
  Pressable,
  type PressableProps,
  type GestureResponderEvent,
  type View,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "items-center justify-center rounded-md flex-row gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

const Button = forwardRef<View, ButtonProps>(function Button(
  { className, variant, size, onPress, disabled, children, ...props },
  ref,
) {
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    onPress?.(event);
  };

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      className={cn(
        buttonVariants({ variant, size }),
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
});

export { Button, buttonVariants };
