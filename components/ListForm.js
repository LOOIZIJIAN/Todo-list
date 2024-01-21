import { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function ListForm(
  {
  _id,
  title:existingTitle, 
  detail:existingDetail,
  date:existingDate,
  remark:existingRemark,
  urgent:existingUrgent,
  }
) {
  const [title, setTitle] = useState(existingTitle || ' ');
  const [detail, setDetail] = useState(existingDetail || ' ');
  const [date, setDate] = useState(existingDate || ' ');
  const [remark, setRemark] = useState(existingRemark || ' ');
  const [urgent, setUrgent] = useState(existingUrgent || false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTitle(existingTitle || '');
    setDetail(existingDetail || '');
    setDate(existingDate || '');
    setRemark(existingRemark || '');
    setUrgent(existingUrgent || false);
  }, [existingTitle, existingDetail, existingDate, existingRemark, existingUrgent]);


  async function saveList(ev) {
    ev.preventDefault();
    const data = {title, detail, date, remark, urgent};
    if(_id){
      await axios.put('/api/list', {...data,_id})
    }else{
      await axios.post('/api/list', {...data});
    }
    setSuccess(true);
  }

  useEffect(()=>{
    if(success==true){
      router.push('/');
    }
  },[success]);

  const handleCheckboxChange = (ev)=>{
    ev.target.checked ? setUrgent(true) : setUrgent(false);
  }

  return(
    <Layout>
      <div className="bg-white">
        <header className="shadow bg-blue-900 text-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {existingTitle ? (<h1 className="text-3xl font-bold tracking-tight">Edit Task</h1>) 
            
              :
                (<h1 className="text-3xl font-bold tracking-tight">New Task</h1>)
            }
            
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <form className="border-2 border-gray-300 p-4" onSubmit={saveList}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title:
                </label>
                <input
                  className="appearance-none border-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={ev => setTitle(ev.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
                  Detail:
                </label>
                <textarea
                  className="appearance-none border-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="detail"
                  placeholder="Enter details"
                  value={detail} 
                  onChange={ev => setDetail(ev.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                  Due Date:
                </label>
                <input
                  className="appearance-none border-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="datetime-local"
                  id="dueDate"
                  name="dueDate"
                  value={date}
                  onChange={ev => setDate(ev.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                 Remark:
                </label>
                <input
                  className="appearance-none border-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter remark"
                  id="remark"
                  name="remark"
                  value={remark}
                  onChange={ev => setRemark(ev.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="urgent" className="text-red-500 text-sm font-bold mr-2">
                  Urgent
                </label>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="urgent"
                    name="priority"
                    className="form-radio text-red-500 h-4 w-4 focus:ring-red-500 align-middle"
                    onChange={handleCheckboxChange}
                    checked={urgent}
                  />
                </div>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Task
              </button>
            </form>
          </div>
        </main>
      </div>

    </Layout>
  );
}