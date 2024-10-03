import { collection, getDocs } from 'firebase/firestore'
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Bar } from 'react-chartjs-2';
import '../style/chart.css'

import {
    Chart as ChartJS,
    CategoryScale,    
    LinearScale,     
    BarElement,       
    Title,           
    Tooltip,        
    Legend            
  } from 'chart.js';
  import 'chart.js/auto'; 
import { Navbar } from '../components';
  
  // Register scales and elements used
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
    const [users,setUsers]= useState([])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Number of Requests',
            data: [],
          },
        ],
      }); 
    const [status, setStatus] = useState('pending');

    const fetchUsers=async()=>{
        const userCollection= collection(db,'connections');
        const snap= await getDocs(userCollection);
        const data=snap.docs.map((doc)=>({
            id:doc.id,
            ...doc.data(),
        }))
        setUsers(data);
        console.log(data)
        prepareChartData(data, status); 

    }

    const prepareChartData=(userList,selectedStatus)=>{
        const monthlyData={};
        userList.forEach(user => {
            const appDate= new Date(user.dateofApplication)
            const monthYear = `${appDate.getMonth() + 1}-${appDate.getFullYear()}`;
            console.log(monthYear)
            if (user.status === selectedStatus) {
                if (monthlyData[monthYear]) {
                  monthlyData[monthYear] += 1;
                } else {
                  monthlyData[monthYear] = 1;
                }
            }
        }); 
        const labels = Object.keys(monthlyData).sort();
        console.log(labels)
        const data = Object.values(monthlyData);
        console.log(data)

        setChartData({
            labels: labels.length ? labels : [],  
            datasets: [
              {
                label: `Number of ${selectedStatus} Requests`,
                data: data.length ? data : [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });          

    }

    useEffect(()=>{
        fetchUsers();
    },[])

    useEffect(() => {
        prepareChartData(users, status);
      }, [status]);

    
    
  return (
    <div className='chart-page'>
      <Navbar name="Analysis"/>
    <div className='chart-filters'>

    <span>Status: </span>
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
    </div>

    <div style={{ marginTop: '30px' }}>
      <h3>Number of Requests per Month</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month-Year',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Requests',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  </div>
  )
}

export default Chart
