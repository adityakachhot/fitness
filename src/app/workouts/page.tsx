"use client";
import { useEffect, useState } from "react";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    fetch("/api/workouts")
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  const filtered =
    filter === "ALL"
      ? workouts
      : workouts.filter(w => w.type === filter);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Workouts</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setFilter("ALL")} className={`px-4 py-2 rounded ${filter === "ALL" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>All</button>
        <button onClick={() => setFilter("GYM")} className={`px-4 py-2 rounded ${filter === "GYM" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Gym</button>
        <button onClick={() => setFilter("HOME")} className={`px-4 py-2 rounded ${filter === "HOME" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Home</button>
      </div>
      <div className="grid gap-6">
        {filtered.length === 0 && <div>No workouts found.</div>}
        {filtered.map(w => (
          <div key={w.id} className="p-6 bg-white rounded shadow flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{w.title}</h2>
            <div className="text-sm text-gray-500">{w.type} | {w.difficulty}</div>
            <p>{w.description}</p>
            <a href={`/workouts/${w.id}`} className="text-blue-600 hover:underline text-sm">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
} 