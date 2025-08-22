import { useEffect, useState } from "react";
import { useStore, type Progress as P } from "@/store/useStore";
import { progressAPI } from "@/services/api";

const Progress = () => {
  const { currentRoadmap, progress, setProgress } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!currentRoadmap) return;
      try {
        setLoading(true);
        const res = await progressAPI.getByRoadmap(currentRoadmap._id);
        setProgress(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentRoadmap, setProgress]);

  const mark = async (day: number) => {
    if (!currentRoadmap) return;
    await progressAPI.markComplete(currentRoadmap._id, day);
    setProgress([
      ...(progress || []),
      {
        _id: `${day}`,
        roadmapId: currentRoadmap._id,
        day,
        completed: true,
      } as any,
    ]);
  };

  if (!currentRoadmap) {
    return (
      <div className="text-sm text-neutral-500">
        Select a roadmap first in Roadmaps page.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Progress for current roadmap</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const done = progress.some(
              (p: P) => p.roadmapId === currentRoadmap._id && p.day === day,
            );
            return (
              <button
                key={day}
                onClick={() => mark(day)}
                disabled={done}
                className={`rounded-md p-3 text-sm border ${done ? "bg-green-600 text-white border-green-700" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
              >
                Day {day}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Progress;
