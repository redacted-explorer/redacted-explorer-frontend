import { useEffect } from "react";

export default function AlertCard({
  id,
  message,
  onRemove,
}: {
  id: number;
  message: string;
  onRemove: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000); // Adjust the timeout duration here

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className="alert-card fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-md mb-2">
      {message}
    </div>
  );
}
