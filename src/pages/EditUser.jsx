// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase';
import '../style/editUser.css'
import { Navbar } from '../components';

const EditUser = () => {
    const nav=useNavigate();
    const {id}= useParams();
    const [user,setUser]=useState([]);
    const [loadApplied,setLoadApplied]=useState('');
    const [name,setName]=useState('');
    const [email, setEmail]=useState('');
    const [address,setAddress]=useState('');


    useEffect(()=>{
        const fetchUser=async()=>{
            const userDoc= await getDoc(doc(db,"connections",id));
            setUser(userDoc.data());
            console.log(userDoc.data())
            setLoadApplied(userDoc.data().loadApplied);
            setAddress(userDoc.data().address);
            setName(userDoc.data().name);
            setEmail(userDoc.data().email);

        };
        fetchUser();

    },[id])

    const handleUpdate= async ()=>{
        if (loadApplied > 200) {
            alert("Load applied should not exceed 200 KV");
            return;
          }
        await updateDoc(doc(db,"connections",id),{
            loadApplied,
            name,
            email,
            address
            })
            alert("User updated successfully");
        nav('/');
        
    }

    const handleDelete= async ()=>{
        if (user.status!=="rejected"){
            alert(`record status is ${user.status} it cannot be deleted`)
            return
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            const userDoc = doc(db, 'connections', id);
            try{
                await deleteDoc(userDoc);
                alert('User deleted successfully!');
                nav('/')
            }catch (error) {
                console.error("Error deleting user: ", error);
                alert('Error deleting user!');
              }
        }
    }

  return (
    <div className='container'>
       <Navbar name='Edit connection'/>
      <div className='container2'>
      
      <div className='span'>

      <p>Applicant ID: {user.applicantId}</p>
      <p>Date of Application: {user.dateofApplication}</p>
      <p>Status: {user.status}</p>
      </div>
      <div className='inputbox'>

      <label htmlFor='load'>load in KV</label>
      <input id='load'
        placeholder="Load Applied"
        value={loadApplied}
        onChange={e => setLoadApplied(e.target.value)}
        type="number"
        />
        </div>
        <div className='inputbox'>

      <label htmlFor='name'>Name</label>
      <input id='name'
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
        />
        </div>
        <div className='inputbox'>

      <label htmlFor='email'>Email</label>
      <input id="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        </div>
        <div className='inputbox'>

      <label htmlFor='address'>Address</label>
      <input id='address'
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        />
        </div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        </div>

    </div>
  )
}

export default EditUser
