// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../firebase";
import '../style/home.css';
import { Navbar } from '../components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const [connections,setConnections]= useState([]);
  const [query,setQuery]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [dateResults, setDateResults] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateFilter = (start, end) => {
    if(start && end){

      const filteredConnections = connections.filter((connection) => {
        const date = new Date(connection.dateofApplication);
        return date >= start && date <= end;
      });
      setSearchResults(filteredConnections);
      setDateResults(filteredConnections);
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handleClear= ()=>{
    setStartDate(null);
    setEndDate(null);
    setQuery("");
    setSearchResults(connections)
    setDateResults(null);
  }

  const handleSearchChange = (e)=>{
    const q= e.target.value;
    setQuery(q);
    if (q){
      const filtered = searchResults.filter((connection) => {
        return connection.applicantId.toLowerCase().includes(q.toLowerCase());
      });
      setSearchResults(filtered);
    }
    else{
      if (dateResults){
        setSearchResults(dateResults);
      }
      else{
        setSearchResults(connections);
      }
    }
    

  }
  
  const fetchConnections= async ()=>{
    const data= await getDocs(collection(db,'connections'));
    const connectionsArray=data.docs.map(doc => ({...doc.data(),id:doc.id}) )
    setConnections(connectionsArray);
    setSearchResults(connectionsArray);

  }
  useEffect(()=>{
    fetchConnections();
    console.log(import.meta.env.VITE_API_FIREBASE_API_KEY)
  },[])



  return (
    <div>
      <Navbar name="Electricity Connections" />


      <div className="date-filter-container">
      <div className="datepicker-wrapper">
      <span>Select Date Range:</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateFilter(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
          className="custom-date-input"
          showPopperArrow={false}
          calendarClassName="custom-calendar"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateFilter(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="MM/dd/yyyy"
          placeholderText="End Date"
          className="custom-date-input"
          showPopperArrow={false}
          calendarClassName="custom-calendar"
        />
      </div>
    </div>

      <span>Search By Id : </span>
      <input className='search' placeholder='Enter id' value={query} onChange={handleSearchChange} />
      <button onClick={handleClear}>Clear</button>

      <table className='content-table'>
        <thead>
          <tr>
          <th>Applicant ID</th>
            <th>Name</th>
            <th>Date of Application</th>
            <th>Load Applied (KV)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length>0 ?(
            searchResults.map(connection => (
              <tr key={connection.id}>
                <td>{connection.applicantId}</td>
                <td>{connection.name}</td>
                <td>{connection.dateofApplication}</td>
                <td>{connection.loadApplied}</td>
                <td>{connection.status}</td>
                <td>
                  <button onClick={()=>window.location.href=`/edit-user/${connection.id}`}>Edit</button>
                </td>
                </tr>
                ))
              ): (
                <tr>
                  <td colSpan={6}>No records found</td>
                  </tr>

              )

          }
        </tbody>
      </table>

    </div>

  )
}

export default Home

