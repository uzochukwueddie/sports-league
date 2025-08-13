import { useReducer, type FC, type ReactElement, type ReactNode } from 'react';
import { seasonReducer, SeasonsContext } from '../../context/SeasonsContext';
import type { SeasonState } from '../../interfaces/season.interface';
import { sportService } from '../../services/sport.service';

const initialState: SeasonState = {
  seasonBadges: {},
  loading: {},
  errors: {}
};

const SeasonProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(seasonReducer, initialState);

  const fetchSeasonBadge = async (leagueId: string): Promise<void> => {
    dispatch({ type: 'FETCH_BADGE_START', payload: leagueId });

    try {
      // First, check if we have both cached season data and cached image
      const cachedBadgeUrl = await sportService.getCachedLeagueBadge(leagueId);

      if (cachedBadgeUrl) {
        // Both season data and image are cached, use cached data
        dispatch({
          type: 'FETCH_BADGE_SUCCESS',
          payload: {
            leagueId,
            badgeUrl: cachedBadgeUrl
          }
        });
        return;
      }

      // If not fully cached, fetch from API
      const data = await sportService.getLeagueSeasons(leagueId);

      if (data.seasons && data.seasons.length > 0) {
        const seasonWithBadge = data.seasons.find((season) => season.strBadge);
        if (seasonWithBadge) {
          await sportService.cacheImage(seasonWithBadge.strBadge);
          dispatch({
            type: 'FETCH_BADGE_SUCCESS',
            payload: {
              leagueId,
              badgeUrl: seasonWithBadge.strBadge
            }
          });
        } else {
          dispatch({
            type: 'FETCH_BADGE_ERROR',
            payload: {
              leagueId,
              error: 'No season badge found'
            }
          });
        }
      } else {
        dispatch({
          type: 'FETCH_BADGE_ERROR',
          payload: {
            leagueId,
            error: 'No seasons found'
          }
        });
      }
    } catch (err) {
      dispatch({
        type: 'FETCH_BADGE_ERROR',
        payload: {
          leagueId,
          error: err instanceof Error ? err.message : 'An error occurred'
        }
      });
    }
  };

  // Get badge status for a specific league
  const getBadgeStatus = (leagueId: string) => {
    return {
      badgeUrl: state.seasonBadges[leagueId] || null,
      loading: state.loading[leagueId] || false,
      error: state.errors[leagueId] || null
    };
  };

  return (
    <SeasonsContext.Provider
      value={{
        state,
        dispatch,
        fetchSeasonBadge,
        getBadgeStatus
      }}
    >
      {children}
    </SeasonsContext.Provider>
  );
};

export default SeasonProvider;
