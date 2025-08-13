export interface DropdownOption {
  value: string;
  label: string;
}

export type Option = DropdownOption;

export interface DropdownProps {
  options?: Option[];
  placeholder?: string;
  value?: Option | null;
  onChange?: (option: Option) => void;
}
