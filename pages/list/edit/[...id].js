import ListForm from "@/components/ListForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditList() {
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

  console.log("list:", list);

  return(
    <ListForm {...list}/>
  );
}