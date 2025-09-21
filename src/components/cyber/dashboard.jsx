import React, { useState } from 'react';

// Sample lab/project data
const labs = [
  { id: 1, title: 'Lab Setup', 
    type: 'Writeup',
    description: 'Making a safe testing environment on my network!', 
    status: 'done!' },
  { id: 2, title: 'Investigation - Cerulean', 
    type: 'CTF',
    description: 'My first Blue Team Labs Online experience.', 
    status: 'in progress' },
  { id: 3, title: 'basic basic attack types', 
    type: 'Writeup',
    description: 'simulate a password brute force on myself.', 
    status: 'in progress' },
  // { id: 4, title: 'Malware Analysis', 
  //   type: 'Writeup',
  //   description: 'Deep dive into malware behavior.', 
  //   status: 'In Progress' },
];

export default function Dashboard() {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredLabs = labs.filter(lab => {
    const typeMatch = filterType === 'All' || lab.type === filterType;
    const statusMatch = filterStatus === 'All' || lab.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="flex gap-6 min-h-screen bg-gray-900/50 p-6 text-white">
      {/* left side */}
      <div className="infront flex-1">

        <h1 className="text-3xl mb-6">Dashboard</h1>

              {/* Filters */}
        <div className="gap-4 mb-6 font-inconsolata">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-gray-800 p-2 rounded mr-2">
            <option>All</option>
            <option>CTF</option>
            <option>Writeup</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-800 p-2 rounded ml-2">
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            {/* <option>Not Started</option> */}
          </select>
        </div>

        {/* Lab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map(lab => (
            <div key={lab.id} className="bg-gray-500/20 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <a href={'/cybersec/' + lab.id}>
                {lab.title}
                </a>
                </h2>
              <div className="flex gap-2 mb-2 font-jura">
                <span className={`px-2 py-1 rounded text-sm ${
                  lab.type === 'CTF' ? 'text-purple-400/90 bg-purple-700/40 border border-purple-600/70' 
                  : lab.type === 'Writeup' ? 'text-indigo-300/70 bg-indigo-700/40 border border-indigo-500/80' 
                  : lab.type === 'Setup' ? 'text-pink-300/70 bg-pink-700/40 border border-pink-500/80'
                  : 'bg-red-600/40'}`}>{lab.type}</span>
                {/* <span className="bg-purple-600 px-2 py-1 rounded text-sm">{lab.difficulty}</span> */}
                <span className={`px-2 py-1 rounded text-sm ${
                  lab.status === 'done!' ? 'text-green-400/70 bg-green-500/20 border border-green-600/70' 
                  : lab.status === 'in progress' ? 'text-yellow-300/70 bg-orange-300/20 border border-yellow-400/80' 
                  : 'bg-red-600/40'}`}>{lab.status}</span>
              </div>
              <p className="text-gray-300 mb-2">{lab.description}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-50 bg-gray-800/30 p-4 rounded-xl space-y-2">
        <h2 className="text-lg font-semibold mb-2">Lab Overview</h2>
          <div className="flex gap-6">
          {['CTF', 'Writeup'].map((type) => {
            const count = labs.filter(l => l.type === type).length;
            const percentage = (count / labs.length) * 100;

            return (
              <div key={type} className="flex flex-col items-center">
                {/* Label */}
                <span className="text-gray-100/50 font-inconsolata mb-2">{type}: {count}</span>

                {/* Vertical Bar */}
                <div className="bg-gray-700/40 w-8 h-32 rounded relative">
                  <div
                    className={`w-full rounded-b absolute bottom-0 ${type === 'CTF' ? 'bg-purple-700/40 border border-purple-600/70' : 'bg-indigo-700/40 border border-indigo-500/80'}`}
                    style={{ height: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>




    </div>
  );
}
