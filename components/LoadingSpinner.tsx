
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <svg 
    width="80" 
    height="80" 
    viewBox="0 0 100 100" 
    preserveAspectRatio="xMidYMid" 
    style={{ background: 'none' }}
    aria-label="Loading content"
  >
    <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#f97316" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
    </circle>
    <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#fde68a" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
    </circle>
  </svg>
);

export default LoadingSpinner;
