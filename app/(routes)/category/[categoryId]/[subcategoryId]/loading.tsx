import React from 'react';

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="animate-pulse space-y-4">
        <div className="bg-line mb-4 h-8 w-1/3 rounded-sm"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="bg-line mb-2 h-6 rounded-sm"></div>
              <div className="bg-muted mb-2 h-4 rounded-sm"></div>
              <div className="bg-muted mb-2 h-4 w-1/2 rounded-sm"></div>
              <div className="bg-muted h-40 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
