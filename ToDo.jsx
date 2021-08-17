import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const getLocalItems = ()=>{
    const list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}
const ToDo = () =>{
    const [inputData,setInputData] = useState("");
    const [item,setItems] = useState(getLocalItems());
    const [togalBtn,setTogalBtn] = useState(true);
    const [editItems,setEditItems] = useState(null);

    const addItem = () =>{
        if(!inputData){
            alert("Enter Data");
        }else if(inputData && !togalBtn){
            setItems(
                item.map((elem)=>{
                    if(elem.id === editItems){
                        return{...elem, name:inputData}
                    }
                    return elem;
                }))
                setTogalBtn(true);
                setInputData("");
                setEditItems(null);
            }else{ 
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...item,allInputData]);
            setInputData("");
        }
    }
    const deletItem =(index)=>{
        const utdateitemb = item.filter((elem)=>{
            return index !== elem.id;
        })
        setItems(utdateitemb);
    }
    useEffect(() =>{
        localStorage.setItem('lists',JSON.stringify(item));
    },[item]);

    const editItem = (id) =>{
        let newEditItem = item.find((elem)=>{
            return elem.id == id;
        });
        console.log(newEditItem);
        setTogalBtn(false);
        setInputData(newEditItem.name);
        setEditItems(id);
    }
    return(
        <>
        <div className="main">
            <div className="center">
              <br />
              <h1> ToDo List</h1>
              <br />
              <input type="text" placeholder="Add an item" value={inputData} onChange={(e)=> setInputData(e.target.value)}/>

            {
              togalBtn ? <Button className="btn" onClick={addItem}><AddIcon/></Button>:
                        <EditIcon className="editIcon" onClick={addItem}/>
            }
              <div className="todo_style">
              
                      {item.map((elem)=>{
                          return(<div className="detetitem"  key={elem.id}>
                              <h3>{elem.name}</h3>
                              <div className="todo_btn">
                                <EditIcon className="editIcon" onClick={()=> editItem(elem.id)}/>
                                <DeleteIcon className="deleteIcon" onClick={()=> deletItem(elem.id)}/>
                            </div>
                          </div>)
                      })}
                {/* <span>
                    <EditIcon className="editIcon"/>
                </span> */}
          </div>
            </div>
          </div>
        </>
    );
}
export default ToDo;