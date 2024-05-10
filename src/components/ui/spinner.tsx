import React from 'react';

const Spinner = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-2">{text}</span>
    </div>
  );
}

export default Spinner;