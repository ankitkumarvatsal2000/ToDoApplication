import React, { useState } from 'react'
import '../Style_sheet/Todo.css';

const TO_DO = () => {
  const [activity, setActivity] = useState("");
  // console.log(activity)
  const [listData, setlistData] = useState([]);
  const [clickEdit, setClickEdit] = useState(true);
  const [isEdit, setIsEdit] = useState("");
  const [searchHandle, setSearchHandle] = useState("");

  //  -----------Add ToDo items -------------------//
  const addTask = (e) => {
    e.preventDefault();

    if (!activity) {


      alert('please add the input')

    }
    else if (activity.trim() === "") {
      alert("Please enter valid input");
    }

    // -----edit todo items---------------------------------
    else if (activity && !clickEdit) {
      setlistData(
        listData.map((item) => {
          if (item.id == isEdit) {
            return { ...item, name: activity }
            
          }
         
          return item;
        })
      
      )
    
      setActivity("")
      setClickEdit(true)


    } else {
      const newActivityData = { id: new Date().getTime().toString(), name: activity }
      setlistData([...listData, newActivityData]);
      console.log(listData)
      setActivity("")

    }

  }
  // -------------Delete ToDo Item--------------------
  const removeItem = (idx) => {
    const updatedListData = listData.filter((ele) => {
      return idx != ele.id;
    })
    setlistData(updatedListData)

  }
  //  const removeItem = (id)=>{
  //     const upDatedList = [...listData];
  //     upDatedList.splice(id, 1);
  //     setlistData(upDatedList);
  //   } 
  const allRemove = () => {
    setlistData([]);
  }

        // ------- Edit Todo items---------------
  const editclick = (index) => {
    const findEditElemet = listData.find((editEle) => {
      return index == editEle.id;


    })
    console.log(findEditElemet)
    setClickEdit(false)
    setActivity(findEditElemet.name);
    setClickEdit(false)
    setIsEdit(index)

  }

  // -------------search ToDo item-----------------
  const handleSearch = (e) => {
    setSearchHandle(e.target.value);
    const filteredList = listData.filter((item) => {
      return item.name.toLowerCase().includes(searchHandle.toLowerCase());
    });

    setlistData(filteredList)
  }
  console.log(searchHandle)





  return (
    <>
      <div className='container'>
        <h1 className='heading'> ToDo List</h1>
        <input className='Search' type='text' placeholder='Search by Name' value={searchHandle} onChange={handleSearch} ></input>
        <div className='handle'>
          <input className='inp' type='text' placeholder='Add Activity' value={activity} onChange={(e) => setActivity(e.target.value)} ></input>
          {(clickEdit) ?
            <button className='btn' onClick={addTask}>Add</button> :
            <button className='btn' onClick={addTask}>UPDATE</button>}
        </div>
        {
          listData.map((item) => {
            return (
              <p className='all' key={item.id}>
                <div className='items'> {item.name}</div>
                <button className='btn' onClick={() => editclick(item.id)}>Edit</button>
                <button className='btn-1' onClick={() => removeItem(item.id)}>Remove</button>
              </p>

            )
          })
        }
        {(listData.length >= 1) ?
          <button className='remove-all' onClick={allRemove}>Remove All</button> :
          <p className='para'>No Task Available</p>
        }


      </div>
    </>
  )
}

export default TO_DO;