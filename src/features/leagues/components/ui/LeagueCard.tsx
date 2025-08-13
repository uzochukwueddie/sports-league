import { useState, type FC, type ReactElement } from 'react';
import type { League } from '../../interfaces/league.interface';
import { useSeasonContext } from '../../context/SeasonsContext';

// Loading Spinner Component
const LoadingSpinner: FC = (): ReactElement => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const sportColors: Record<string, string> = {
  Soccer: 'bg-green-100 border-green-200 text-green-800',
  Basketball: 'bg-orange-100 border-orange-200 text-orange-800',
  'American Football': 'bg-blue-100 border-blue-200 text-blue-800',
  'Ice Hockey': 'bg-cyan-100 border-cyan-200 text-cyan-800',
  Motorsport: 'bg-red-100 border-red-200 text-red-800'
};

const LeagueCard: FC<{ leagues: League[] }> = ({ leagues }): ReactElement => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { fetchSeasonBadge, getBadgeStatus } = useSeasonContext();
  const { badgeUrl, loading, error } = getBadgeStatus(`${selectedLeague?.idLeague}`);

  const getSportIcon = (sport: string): string => {
    switch (sport) {
      case 'Soccer':
        return '⚽';
      case 'Basketball':
        return '🏀';
      case 'American Football':
        return '🏈';
      case 'Ice Hockey':
        return '🏒';
      case 'Motorsport':
        return '🏎️';
      default:
        return '🏆';
    }
  };

  const handleCardClick = (league: League | null): void => {
    if (league) {
      setSelectedLeague(selectedLeague?.idLeague === league.idLeague ? null : league);
      setImageLoading(true);
      fetchSeasonBadge(league.idLeague).finally(() => setImageLoading(false));
    } else {
      setSelectedLeague(null);
      setImageLoading(false);
    }
  };

  const handleImageLoad = (): void => {
    setImageLoading(false);
  };

  const handleImageError = (): void => {
    setImageLoading(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {leagues.map((league: League) => {
        const isSelected = selectedLeague?.idLeague === league.idLeague;
        return (
          <div key={league.idLeague} className="relative">
            {isSelected && (
              <div
                onClick={() => handleCardClick(null)}
                className="absolute cursor-pointer flex items-center justify-center h-40 inset-0 z-10 bg-white rounded-lg border border-gray-200 border-b-0 overflow-hidden animate-in fade-in duration-300"
              >
                {(loading || imageLoading) && !error ? (
                  <LoadingSpinner />
                ) : badgeUrl && !error ? (
                  <img
                    src={badgeUrl}
                    alt={league.strLeague}
                    className="max-h-full max-w-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    <span>Image not available</span>
                  </div>
                )}
              </div>
            )}

            <div
              className="bg-white rounded-lg transition-all duration-200 border border-gray-200 cursor-pointer"
              onClick={() => handleCardClick(league)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl">{getSportIcon(league.strSport)}</span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${sportColors[league.strSport] || 'bg-gray-100 border-gray-200 text-gray-800'}`}
                  >
                    {league.strSport}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight line-clamp-2">
                  {league.strLeague}
                </h3>

                <div className="mb-3">
                  <p
                    className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 truncate"
                    title={league.strLeagueAlternate}
                  >
                    {league.strLeagueAlternate || league.strLeague}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-mono">#{league.idLeague}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeagueCard;
