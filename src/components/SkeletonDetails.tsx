export function SkeletonDetail() {
    return (
      <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow animate-pulse dark:bg-gray-800">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full h-64 bg-gray-200 rounded md:w-1/3 dark:bg-gray-700" />
          <div className="flex-1 space-y-4">
            <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="w-1/2 h-5 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-40 h-10 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }
