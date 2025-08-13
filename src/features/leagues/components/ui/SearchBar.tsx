import { useEffect, useState, type ChangeEvent, type FC, type ReactElement } from 'react'
import Input from './Input'
import { Search } from 'lucide-react';
import { useLeaguesContext } from '../../context/LeaguesContext';
import { useDebounce } from '../../../../hooks/useDebounce';

const SearchBar: FC = (): ReactElement => {
  const { dispatch } = useLeaguesContext();
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearchTerm });
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="relative">
      <div
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search leagues"
        value={inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
        className="w-full pl-8"
      />
    </div>
  )
}

export default SearchBar
