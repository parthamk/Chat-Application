import React, {useEffect, useState} from 'react'
import './Sidebar.css'
import man from './img/men.png'
import SidebarChat from './SidebarChat'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from './firebase';

const Sidebar = ({userName}) => {
    const [group, setGroup] = useState([]);


    const getGroups = async()=> {
        const getData = onSnapshot(collection(db, "groups"), (snapshot)=>{
            let list = []
            snapshot.docs.forEach((doc)=>{
                list.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            setGroup(list);
        });
    };

    useEffect(()=>{
        getGroups();
    },[]);
  return (
    <div className='sidebar'>
        {/* Header */}
        <div className="sidebarHeader">
            <div style={{display: "flex", paddingLeft: "2px"}}>
                <img src={man} alt="" />
                <h1 style={{paddingLeft: "5px"}}>{userName}</h1>
            </div>
            <div className="sidebarHeaderRight">
                <button style={{border:'none'}}>
                    <span className="material-symbols-outlined">data_usage</span>
                </button>
                <button style={{border:'none'}} className='logout'>
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
                <button style={{border:'none'}}>
                    <span className="material-symbols-outlined">chat</span>
                </button>
            </div>
        </div>
        {/* Sidebar search */}
        <div className="sidebarSearch">
            <div className="sidebarSearchContainer">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder='Search contact' />
            </div>
        </div>
        {/* Sidebar Chats */}
        <div className="sidebarChats">
            <SidebarChat addNewChat/>
            {
                group.map((group)=>{
                    return <SidebarChat key={group.id} name={group.name} id={group.id} />
                })
            }
        </div>
    </div>
  )
}

export default Sidebar