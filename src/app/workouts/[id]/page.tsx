import { useEffect, useState } from "react";

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/workouts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setWorkout(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!workout || workout.error) return <div className="p-8 text-red-500">Workout not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
      <div className="mb-2 text-gray-500">{workout.type} | {workout.difficulty}</div>
      {workout.image && <img src={workout.image} alt={workout.title} className="mb-4 rounded w-full max-h-64 object-cover" />}
      <p className="mb-4">{workout.description}</p>
      <h2 className="text-xl font-semibold mb-2">Steps</h2>
      <ol className="list-decimal list-inside mb-4">
        {workout.steps.split('\n').map((step: string, i: number) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <h2 className="text-xl font-semibold mb-2">Equipment</h2>
      <p>{workout.equipment}</p>
    </div>
  );
} 