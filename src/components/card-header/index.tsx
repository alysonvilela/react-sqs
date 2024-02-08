import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CardHeaderProps extends ComponentProps<"header"> {
  title: string;
}

export const CardHeader = ({ title, className, ...props }: CardHeaderProps) => {
  return (
    <header
      className={cn(
        "p-4 pt-2 border-b-[1px] border-slate-200 mb-4 text-center ",
        className
      )}
      {...props}
    >
      <h2 className="uppercase text-xs tracking-widest text-slate-500">
        {title}
      </h2>
    </header>
  );
};
