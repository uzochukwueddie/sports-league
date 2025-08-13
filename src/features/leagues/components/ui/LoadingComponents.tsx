import type { FC, ReactElement } from 'react';

// Generic loading spinner
export const LoadingSpinner: FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({
  size = 'md',
  text = 'Loading...'
}): ReactElement => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );
};

// Feature loading component
export const FeatureLoading: FC = (): ReactElement => (
  <div className="min-h-screen bg-white">
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
    </header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LoadingSpinner size="lg" text="Loading sports leagues..." />
    </main>
  </div>
);

// Component loading placeholder
export const ComponentLoading: FC<{ height?: string }> = ({ height = 'h-32' }): ReactElement => (
  <div className={`flex items-center justify-center ${height} bg-gray-50 rounded-lg animate-pulse`}>
    <LoadingSpinner size="sm" text="" />
  </div>
);

// Card grid loading skeleton
export const CardGridLoading: FC = (): ReactElement => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-3"></div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="w-12 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// Search and filter loading
export const FilterLoading: FC = (): ReactElement => (
  <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4 animate-pulse">
    <div className="flex-1">
      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="sm:w-64">
      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);
