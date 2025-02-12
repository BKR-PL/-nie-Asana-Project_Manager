import React, { useState, useEffect } from 'react';

function ProjectDetails({ project, updateProject }) {
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('12:00');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    setEditDescription(project.description || '');
  }, [project]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTask = { text: newTodo, date: selectedDate, time: time };
    const updatedProject = { ...project, todos: [...project.todos, newTask] };
    updateProject(updatedProject);
    setNewTodo('');
  };

  const removeTodo = (index) => {
    const updatedProject = { ...project, todos: project.todos.filter((_, i) => i !== index) };
    updateProject(updatedProject);
  };

  const removeDoneTask = (index) => {
    const updatedProject = { ...project, doneTasks: project.doneTasks.filter((_, i) => i !== index) };
    updateProject(updatedProject);
  };

  const markAsDone = (index) => {
    const data = new Date();
    const docelowaData = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
    const task = project.todos[index];
    const doneTask = { ...task, completedDate: docelowaData };
    const updatedProject = {
      ...project,
      todos: project.todos.filter((_, i) => i !== index),
      doneTasks: [...(project.doneTasks || []), doneTask],
    };
    updateProject(updatedProject);
  };

  const updateDescription = () => {
    const updatedProject = { ...project, description: editDescription };
    updateProject(updatedProject);
  };

  return (
    <div className="mt-4 p-4 bg-dark text-textLight rounded shadow-md">
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <textarea
        className="mt-2 w-full p-2 bg-lightDark border border-gray-600 text-textLight rounded"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        onBlur={updateDescription}
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-lightDark p-4 rounded">
          <h3 className="text-lg font-semibold">TODO:</h3>
          <div className="grid grid-cols-3 text-sm text-gray-400 mb-2 text-center">
            <span>Nazwa</span>
            <span>Termin wykonania</span>
          </div>
          <div className="flex mt-2 gap-2">
            <input 
              type="text" 
              value={newTodo} 
              onChange={(e) => setNewTodo(e.target.value)} 
              className="flex-1 p-2 bg-dark border border-gray-600 text-textLight rounded"
              placeholder="Dodaj zadanie..."
            />
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 bg-dark border border-gray-600 text-textLight rounded"
            />
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="p-2 bg-dark border border-gray-600 text-textLight rounded"
            />
            <button onClick={addTodo} className="ml-2 p-2 bg-blue-600 rounded text-textLight">＋</button>
          </div>
          <ul className="mt-4">
            {project.todos.map((todo, index) => (
              <li key={index} className="p-2 border-b border-gray-600 flex justify-between">
                <span>{todo.text} - {todo.date} {todo.time}</span>
                <div>
                  <button onClick={() => markAsDone(index)} className="text-green-500 mr-2">✔</button>
                  <button onClick={() => removeTodo(index)} className="text-red-500">✖</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-lightDark p-4 rounded">
          <h3 className="text-lg font-semibold">Zrobione:</h3>
          <div className="grid grid-cols-3 text-sm text-gray-400 mb-2 text-center">
            <span>Nazwa</span>
            <span>Termin wykonania</span>
            <span>Data wykonania</span>
          </div>
          <ul className="mt-2">
            {(project.doneTasks || []).map((todo, index) => (
              <li key={index} className="grid grid-cols-4 text-center p-2 border-b border-gray-600">
                <span>{todo.text}</span>
                <span>{todo.date} {todo.time}</span>
                <span>{todo.completedDate}</span>
                <button onClick={() => removeDoneTask(index)} className="text-red-500">✖</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
