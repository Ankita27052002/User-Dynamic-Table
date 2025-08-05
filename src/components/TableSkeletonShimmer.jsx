const TableSkeletonShimmer = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search bar shimmer */}
      <div className="mb-4">
        <div className="w-full h-10 rounded bg-gray-300 shimmer"></div>
      </div>

      {/* Table shimmer */}
      <div className="overflow-hidden rounded-lg shadow-md border border-[#4a4e69]">
        <table className="w-full">
          <thead className="bg-[#4a4e69] text-white text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#f2e9e4] text-[#22223b]">
            {rows.map((_, idx) => (
              <tr key={idx} className="border-b border-[#c9ada7]">
                {[...Array(4)].map((_, i) => (
                  <td key={i} className="p-3">
                    <div className="w-full h-5 rounded bg-gray-300 shimmer"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeletonShimmer;
