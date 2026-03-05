import React from "react";

export function withSlot<T extends React.ElementType>(
  slotName: string,
  Component: T,
) {
  return React.forwardRef<
    React.ComponentPropsWithRef<T>["ref"],
    React.ComponentPropsWithoutRef<T>
  >((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { className, ...rest } = props as any;

    return (
      <Component
        ref={ref as any}
        data-slot={slotName}
        className={className}
        {...(rest as any)}
      />
    );
  });
}
