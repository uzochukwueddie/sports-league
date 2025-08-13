import { BadgeCheck, BadgeX } from 'lucide-react';
import { type FC, type ReactElement } from 'react';

const EmptyLeagues: FC<{ loading: boolean; error: Error | null }> = ({ loading, error }): ReactElement => {
  return (
    <div className="text-center py-20">
      {loading && <BadgeCheck className="mx-auto h-24 w-24 text-gray-4" />}
      {error && <BadgeX className="mx-auto h-24 w-24 text-red-400" />}
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {loading ? 'No leagues found' : 'Error loading leagues'}
      </h3>
      <p className="mt-2 text-gray-500">
        {loading ? 'Try adjusting your search/filter criteria.' : 'Try reloading page.'}
      </p>
    </div>
  );
};

export default EmptyLeagues;
