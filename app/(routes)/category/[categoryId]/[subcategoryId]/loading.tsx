import React from 'react';

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="animate-pulse space-y-4">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="mb-2 h-6 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 rounded bg-gray-100"></div>
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-100"></div>
              <div className="h-40 rounded bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
