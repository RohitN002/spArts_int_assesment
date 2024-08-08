import React from 'react';

import Sidebar from './components/Sidebar';
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <StudentTable />
        </main>
      </div>
    </div>
  );
}

export default App;
