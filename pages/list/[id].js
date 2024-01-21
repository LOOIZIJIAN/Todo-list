import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DisplayList() {
  const [list, setList] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/list?id=${id}`).then((response) => {
      setList(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white border-gray-400 rounded shadow-md p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{list.title}</h2>
          <p className="text-gray-400 mb-4">Remark: {list.remark}</p>
          <div className="max-h-48 overflow-y-auto">
            <p className="text-gray-700">{list.detail}</p>
          </div>
          <div className="flex justify-end mt-6">
            <Link href={`/list/edit/${id}`} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none">
              Edit
            </Link>
            <Link href={`/list/delete/${id}`} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
