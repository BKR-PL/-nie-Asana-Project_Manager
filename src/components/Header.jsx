import React from 'react';

function Header({ toggleSidebar }) {
  return (
    <header className="bg-lightDark shadow-md p-4 w-full fixed top-0 left-0 z-10 flex items-center">
      <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded text-textLight">
        ☰
      </button>
      <div className='w-full text-center'>
        <h1>(nie)Asana</h1>
      </div>
    </header>
  );
}

export default Header;