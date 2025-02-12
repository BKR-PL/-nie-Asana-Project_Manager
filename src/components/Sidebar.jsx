import React from 'react';

function Sidebar({ isOpen, toggleSidebar, projects, onSelectProject, addProject, removeProject }) {
  return (
    <div className={`bg-lightDark shadow-md h-full w-64 fixed top-20 left-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <div className="p-4 border-b border-gray-600 flex justify-between">
        <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded text-textLight">✖</button>
        <button onClick={addProject} className="p-2 bg-green-600 rounded text-textLight">＋</button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-textLight">Projekty</h2>
        <ul className="mt-2">
          {projects.map((project) => (
            <li 
              key={project.id} 
              className="p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700 text-textLight flex justify-between"
              onClick={() => onSelectProject(project)}
            >
              {project.name} 
              <button 
                onClick={(e) => { 
                  e.stopPropagation();
                  removeProject(project.id); 
                }} 
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
