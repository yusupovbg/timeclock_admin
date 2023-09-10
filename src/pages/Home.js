import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const formatReadableDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

const Home = () => {
    const formatDateYMD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clockData, setClockData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Store the current date

  useEffect(() => {
    // Fetch clock data for the selected date from your API
    // Example API call: /api/clock-data?date=selectedDate
    // Update the clockData state with the response
    
  
    fetchClockData(); // Call the function to fetch data when selectedDate changes
  }, [selectedDate]);

  const fetchClockData = async () => {
    try {
        var formattedDate = formatDateYMD(selectedDate)
        const response = await axios.get(`http://52.78.236.151:8000/api/date/${formattedDate}`);
        console.log(response.data)
        setClockData(response.data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
    }

  
  

  // Limit selectable dates until today
  const maxDate = new Date();
  maxDate.setHours(23, 59, 59, 999); // Set the time to the end of today

  return (
    <div className="">
      <Sidebar />
      <div className='ml-64 px-8 mt-10'>
        <div className='flex justify-between items-center px-8'>
          <h1 className='text-xl font-bold'>Clock Data</h1>
          <div className='flex px-2 items-center'>
            <p className='ml-2 font-semibold text-lg'>Select date </p>
            <DatePicker
              className='ml-2 p-2 bg-[#4b49ac] text-white rounded-lg shadow-lg text-center'
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                fetchClockData(); // Fetch data when the date changes
              }}
              maxDate={maxDate} // Set the maximum selectable date
            />
          </div>
        </div>

        <table className="min-w-full mt-8  bg-white shadow-md rounded-xl overflow-x-auto">
          <thead>
            <tr className="bg-[#4b49ac] text-white">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">First Clock In</th>
              <th className="px-4 py-2">Last Clock Out</th>
              <th className="px-4 py-2">Minutes Worked</th>
              <th className="px-4 py-2">Late</th>
              <th className="px-4 py-2">Wage</th>
            </tr>
          </thead>
          <tbody>
            {clockData.map((data, index) => (
              <tr key={data.username} className={(index % 2 === 0) ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 border">{data.username}</td>
                <td className="px-4 py-2 border">{formatReadableDateTime(data.first_clock_in)}</td>
                <td className="px-4 py-2 border">{ data.last_clock_out!=null ? formatReadableDateTime(data.last_clock_out):"Working!"}</td>
                <td className="px-4 py-2 border">{data.minutes_worked}</td>
                <td className="px-4 py-2 border">{data.late}</td>
                <td className="px-4 py-2 border">{data.wage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
