'use client';

import React from 'react';

interface GridViewSelectorProps {
  currentView: number;
  onViewChange: (view: number) => void;
}

export function GridViewSelector({
  currentView,
  onViewChange,
}: GridViewSelectorProps) {
  const viewOptions = [
    { value: 2, label: '2 per row', icon: '⚏' },
    { value: 3, label: '3 per row', icon: '⚏⚏' },
    { value: 4, label: '4 per row', icon: '⚏⚏⚏' },
    { value: 5, label: '5 per row', icon: '⚏⚏⚏⚏' },
    { value: 6, label: '6 per row', icon: '⚏⚏⚏⚏⚏' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 mr-2">View:</span>
      <div className="flex bg-white rounded-lg border border-gray-200 p-1">
        {viewOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onViewChange(option.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              currentView === option.value
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title={option.label}
          >
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {option.value === 2 && (
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                )}
                {option.value === 3 && (
                  <path d="M3 3h5v5H3V3zm7 0h5v5h-5V3zm7 0h5v5h-5V3zM3 10h5v5H3v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5zM3 17h5v5H3v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5z" />
                )}
                {option.value === 4 && (
                  <path d="M3 3h4v4H3V3zm5 0h4v4H8V3zm5 0h4v4h-4V3zm5 0h4v4h-4V3zM3 8h4v4H3V8zm5 0h4v4H8V8zm5 0h4v4h-4V8zm5 0h4v4h-4V8zM3 13h4v4H3v-4zm5 0h4v4H8v-4zm5 0h4v4h-4v-4zm5 0h4v4h-4v-4zM3 18h4v4H3v-4zm5 0h4v4H8v-4zm5 0h4v4h-4v-4zm5 0h4v4h-4v-4z" />
                )}
                {option.value === 5 && (
                  <path d="M2 2h3v3H2V2zm4 0h3v3H6V2zm4 0h3v3h-3V2zm4 0h3v3h-3V2zm4 0h3v3h-3V2zM2 6h3v3H2V6zm4 0h3v3H6V6zm4 0h3v3h-3V6zm4 0h3v3h-3V6zm4 0h3v3h-3V6zM2 10h3v3H2v-3zm4 0h3v3H6v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zM2 14h3v3H2v-3zm4 0h3v3H6v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zM2 18h3v3H2v-3zm4 0h3v3H6v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z" />
                )}
                {option.value === 6 && (
                  <path d="M2 2h2v2H2V2zm3 0h2v2H5V2zm3 0h2v2H8V2zm3 0h2v2h-2V2zm3 0h2v2h-2V2zm3 0h2v2h-2V2zM2 5h2v2H2V5zm3 0h2v2H5V5zm3 0h2v2H8V5zm3 0h2v2h-2V5zm3 0h2v2h-2V5zm3 0h2v2h-2V5zM2 8h2v2H2V8zm3 0h2v2H5V8zm3 0h2v2H8V8zm3 0h2v2h-2V8zm3 0h2v2h-2V8zm3 0h2v2h-2V8zM2 11h2v2H2v-2zm3 0h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zM2 14h2v2H2v-2zm3 0h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zM2 17h2v2H2v-2zm3 0h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" />
                )}
              </svg>
              <span className="hidden sm:inline">{option.value}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
