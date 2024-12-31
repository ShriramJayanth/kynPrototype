"use client";
import { useEffect, useState } from "react";

interface Log {
  id: number;
  userId: string;
  activity: string;
  timestamp: string;
}

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          `http://13.200.235.10:3003/moderate/logs`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch logs.");
        }
        const data: Log[] = await response.json();
        setLogs(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchLogs();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Activity Logs</h1>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Activity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border border-gray-300 px-4 py-2">{log.userId}</td>
                <td className="border border-gray-300 px-4 py-2">{log.activity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsPage;
