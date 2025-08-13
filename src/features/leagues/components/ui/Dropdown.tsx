import { useState, useRef, useEffect, type FC, type ReactElement } from 'react';
import type { DropdownProps, Option } from '../../interfaces/ui.interface';
import { ChevronDown } from 'lucide-react';
import { useLeaguesContext } from '../../context/LeaguesContext';

const Dropdown: FC<DropdownProps> = ({
  options = [],
  placeholder = 'Select an option',
  value,
  onChange
}): ReactElement => {
  const { dispatch } = useLeaguesContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(value || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option): void => {
    dispatch({ type: 'SET_SELECTED_SPORT', payload: option.value });
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 h-10 text-left bg-white border border-gray-200 rounded-lg hover:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          ) : (
            options.map((option: Option, index: number) => {
              const optionValue: string = option.value;
              const optionLabel: string = option.label;
              const isSelected: boolean = typeof selectedOption === 'object' && selectedOption?.value === optionValue;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150 ${
                    isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  {optionLabel}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
