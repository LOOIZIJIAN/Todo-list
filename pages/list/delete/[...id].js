import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteList() {
  const router = useRouter();
  const { id } = router.query;
  const [list, setList] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/list?id=${id}`).then((response) => {
      setList(response.data);
    });
  }, [id]);

  const deleteList = async () => {
    try {
      await axios.delete(`/api/list?id=${id}`);
      goBackHome();
    } catch (error) {
      console.error("Error deleting list:", error);
      
    }
  };

  function goBackHome() {
    router.push('/');
  }

  const goBack = () => {
    router.push('/list/'+id);
  };

  return (
    <div className="bg-bgGray min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Confirm Deletion
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Do you really want to delete&nbsp;&quot;<b>{list?.title}</b>&quot;?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={deleteList}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={goBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>

  );
}
