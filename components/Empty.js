const Empty = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-8 p-8 border border-gray-300 rounded-md bg-white shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800">The list is empty</h1>
        <p className="text-gray-600 mt-2">Start adding tasks to fill up your list!</p>
      </div>
    </div>
  );
};

export default Empty;
