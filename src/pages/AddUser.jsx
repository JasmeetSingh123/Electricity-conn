/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import '../style/addUser.css';
import { Link } from 'react-router-dom';
import { Navbar } from '../components';

const AddUser = () => {
    const [applicantId,setApplicantId]=useState("")
    const [name,setName]=useState("");
    const [loadApplied,setLoadApplied]=useState("");
    const [status,setStatus]=useState("pending");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState('');
    const [govId,setGovId]=useState('');

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if (loadApplied>200){
            alert("Load Applied is more than 200")
            return;
        }
        await addDoc(collection(db,"connections"),{
            applicantId,
            name,
            loadApplied,
            status,
            email,
            address,
            govId,
            dateofApplication:new Date().toISOString().split("T")[0]
        });
        alert("User Added Successfully");
        setName("");
        setApplicantId("");
        setLoadApplied("");
        setStatus("");
        setEmail("");
        setAddress("");
        setGovId("");
                
    }

  return (
    <div className='container'>
        
        {/* <div className='registration'>  Register Connection  <span className='back'><Link to='/'>Back</Link></span></div>
         */}
         <Navbar name='Register Connection' />
        <form onSubmit={handleSubmit}>
        <div className='container2'>
            <div className='inputbox'>
            <span>Application ID</span>
            <input placeholder='Applicant ID' value={applicantId} onChange={e =>setApplicantId(e.target.value)} type='number' required/>
            </div>
            <div className='inputbox'>
                <span>Name</span>
            <input placeholder='Name' value={name} onChange={e =>setName(e.target.value)} required/>
            </div>
            <div className='inputbox'>
                <span>Load Applied</span>
            <input placeholder='Load Applied' value={loadApplied} onChange={e =>setLoadApplied(e.target.value)} type='number' required/>
            </div>
            <div className='inputbox'>
                <span>Email</span>
            <input placeholder='email' value={email} onChange={e =>setEmail(e.target.value)} required/>
            </div>
            <div className='inputbox'>
                <span>Address</span>
            <input placeholder='Address' value={address} onChange={e =>setAddress(e.target.value)} required/>
            </div>
            <div className='inputbox'>
                <span>Govt ID</span>
            <input placeholder='Govt ID' value={govId} onChange={e =>setGovId(e.target.value)} required/>
            </div>
            <div className='inputbox'>
                <span>Status</span>
            <select value={status} onChange={e=>setStatus(e.target.value)} >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
            </div>
        </div>
        <div className='btn'>
            <button className='button' type='submit'>Add Connection</button>
        </div>
            
        </form>
      
    </div>
  )
}

export default AddUser
