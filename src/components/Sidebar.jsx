import React from 'react';

function Sidebar() {
  return (
    <aside className="bg-purple-700 text-white w-full md:w-20 flex md:flex-col items-center py-4 md:py-6 space-y-0 md:space-y-8 space-x-8 md:space-x-0">
      <div>📄</div>
      <div>👤</div>
      <div>🎓</div>
      <div>📅</div>
      <div>⚙️</div>
    </aside>
  );
}

export default Sidebar;
