import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react"
import Empty from "./Empty";

export default function List() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get('/api/list')
      .then(response => {
        setList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (

    list.length === 0 ? (<Empty />) 
      :
        (<div className="mx-16 my-16">
        <ul role="list" className="divide-y divide-gray-700">
          {list.map((list) => (
            <li key={list._id} className="flex justify-between gap-x-6 py-5">
              <Link href={'/list/'+list._id}>
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold leading-6 text-gray-100">{list.title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-">{list.remark}</p>
                  </div>
                </div>
              </Link>
              <Link href={'/list/'+list._id}>                    
                {list.urgent ? (
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                      </div>
                      <p className="text-xs leading-5 text-gray-300">Urgent</p>
                      <p className="text-sm leading-6 text-gray-100">Due on</p>
                      
                    </div>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        <time>{list.date}</time>
                    </p>
                  </div>
                ) : (
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-100">Due on</p>                  
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <time>{list.date}</time>
                    </p>
                  </div>
                )}                
              </Link>          
            </li> 
          ))}
        </ul>
      </div>)
      

      
  )
}
