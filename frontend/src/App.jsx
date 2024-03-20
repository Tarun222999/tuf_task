import React, { useState } from 'react';
import SubmitCode from './pages/SubmitCode';
import CodeTable from './pages/CodeTable';

function App() {
  const [showSubmitCode, setShowSubmitCode] = useState(true);

  const toggleComponent = () => {
    setShowSubmitCode(prevState => !prevState);
  };

  return (
    <>
      <div className="bg-gray-800  text-white py-4 px-8 flex justify-between items-center">
        <button
          onClick={toggleComponent}
        >


          <h1
            className={`text-2xl font-bold cursor-pointer ${showSubmitCode ? 'text-blue-400' : 'text-white'}`}

          >
            Submit Code
          </h1>
        </button>
        <h1
          className="text-2xl font-bold cursor-pointer text-yellow-500"

        >
          Code Store 🐐
        </h1>
        <button
          onClick={toggleComponent}
        >

          <h1
            className={`text-2xl font-bold cursor-pointer ${showSubmitCode ? 'text-white' : 'text-blue-500'}`}

          >
            View Submissions
          </h1>
        </button>
      </div>
      {showSubmitCode ? <SubmitCode /> : <CodeTable />}
    </>
  );
}

export default App;
