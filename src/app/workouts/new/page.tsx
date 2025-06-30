"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewWorkoutPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("GYM");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [equipment, setEquipment] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type, difficulty, description, steps, equipment, image }),
    });
    if (!res.ok) setError("Failed to create workout");
    else router.push("/workouts");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Workout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" required />
        <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
          <option value="GYM">Gym</option>
          <option value="HOME">Home</option>
        </select>
        <input value={difficulty} onChange={e => setDifficulty(e.target.value)} placeholder="Difficulty (e.g. Beginner)" className="border p-2 rounded" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" required />
        <textarea value={steps} onChange={e => setSteps(e.target.value)} placeholder="Steps (one per line)" className="border p-2 rounded" required />
        <input value={equipment} onChange={e => setEquipment(e.target.value)} placeholder="Equipment (comma separated)" className="border p-2 rounded" required />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL (optional)" className="border p-2 rounded" />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Workout</button>
      </form>
    </div>
  );
} 