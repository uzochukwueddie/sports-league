import clsx from "clsx";
import type { ComponentProps } from "react";

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={clsx(
        'block w-full pl-10 pr-3 py-2 h-10 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 sm:text-sm',
        className
      )}
      {...props}
    />
  );
}

export default Input;
