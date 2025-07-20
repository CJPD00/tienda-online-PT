export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded shadow animate-pulse dark:bg-gray-800">
      <div className="h-40 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="h-10 bg-gray-300 rounded dark:bg-gray-700" />
    </div>
  );
}
