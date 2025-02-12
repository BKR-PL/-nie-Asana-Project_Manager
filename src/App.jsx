import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Projekt 1', description: 'Szczegóły projektu 1', todos: [] },
    { id: 2, name: 'Projekt 2', description: 'Szczegóły projektu 2', todos: [] },
    { id: 3, name: 'Projekt 3', description: 'Szczegóły projektu 3', todos: [] },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = () => {
    const projectName = prompt('Podaj nazwę nowego projektu:');
    if (!projectName) return;
    const newProject = {
      id: projects.length + 1,
      name: projectName,
      description: 'Nowy projekt',
      todos: [],
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    if (selectedProject?.id === id) setSelectedProject(null);
  };

  const updateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  return (
    <div className="flex flex-col h-screen bg-dark text-textLight">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 mt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          projects={projects}
          onSelectProject={setSelectedProject} 
          addProject={addProject}
          removeProject={removeProject}
        />
        <main className={`flex-1 p-4 bg-lightDark transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} updateProject={updateProject} />
          ) : (
            <h1 className="text-3xl font-bold">Wybierz projekt</h1>
          )}
        </main>
      </div>
      <footer className='opacity-30'>Bartosz Rożyk WZ_ININ5 71104</footer>
    </div>
  );
}

export default App;