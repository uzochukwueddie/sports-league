import { useEffect, useState, useMemo, type FC, type ReactElement } from 'react';
import SearchBar from './ui/SearchBar';
import Dropdown from './ui/Dropdown';
import { useLeaguesContext } from '../context/LeaguesContext';
import type { DropdownOption } from '../interfaces/ui.interface';
import EmptyLeagues from './ui/EmptyLeagues';
import LeagueCard from './ui/LeagueCard';
import Pagination from './ui/Pagination';

const ITEMS_PER_PAGE = 12;

const Leagues: FC = (): ReactElement => {
  const { fetchLeagues, getSportTypes, getFilteredLeagues, state } = useLeaguesContext();
  const [selectedValue, setSelectedValue] = useState<DropdownOption | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error } = state;

  const allLeagues = getFilteredLeagues();

  // Calculate pagination values
  const totalItems = allLeagues.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Get current page data using useMemo for performance
  const currentPageLeagues = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    return allLeagues.slice(startIndex, endIndex);
  }, [allLeagues, currentPage, totalItems]);

  const formattedSportsTypes = getSportTypes().map((type) => {
    return {
      label: type,
      value: type.toLowerCase()
    }
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [allLeagues.length]); // Reset page when filtered results change

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Sports Leagues</h1>
          <p className="text-gray-600 mt-1">Discover sports leagues from around the world</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!loading && !error && (
          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Leagues</label>
              <SearchBar />
            </div>
            <div className="sm:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sport</label>
              <Dropdown
                options={formattedSportsTypes}
                placeholder="All Sports"
                value={selectedValue}
                onChange={(option) => setSelectedValue(option as DropdownOption)}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading leagues...</span>
          </div>
        )}

        {!loading && allLeagues.length > 0 && (
          <>
            <LeagueCard leagues={currentPageLeagues} />
            <div className="mt-8 grid justify-start">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPaginationData={handlePageChange}
              />
            </div>
          </>
        )}

        {(!loading && allLeagues.length === 0) || error && (
          <EmptyLeagues loading={!loading && allLeagues.length === 0} error={error} />
        )}
      </main>
    </div>
  );
}

export default Leagues;
