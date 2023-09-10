import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    pin: '',
    hourly_wage: '',
  });

  const [weekSchedule, setWeekSchedule] = useState({
    Monday: { startHour: '00', startMinute: '00' },
    Tuesday: { startHour: '00', startMinute: '00' },
    Wednesday: { startHour: '00', startMinute: '00' },
    Thursday: { startHour: '00', startMinute: '00' },
    Friday: { startHour: '00', startMinute: '00' },
    Saturday: { startHour: '00', startMinute: '00' },
    Sunday: { startHour: '00', startMinute: '00' },
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWeekScheduleChange = (e) => {
    const { name, value } = e.target;
    const [day, timePart] = name.split('-');

    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [timePart]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.pin) {
      newErrors.pin = 'PIN is required';
    }
    if (!formData.hourly_wage) {
      newErrors.hourly_wage = 'Hourly Wage is required';
    }
    return newErrors;
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://52.78.236.151:8000/api/user/${id}/`);
      setEmployee(response.data);

      setFormData({
        username: response.data.username,
        pin: response.data.pin,
        hourly_wage: response.data.hourly_wage,
      });

      const updatedWeekSchedule = {};

      response.data.week_schedules.forEach((schedule) => {
        const day = getDayOfWeek(schedule.day_of_week);
        updatedWeekSchedule[day] = {
          startHour: schedule.start_time.split(':')[0],
          startMinute: schedule.start_time.split(':')[1],
          id: schedule.id,
        };
      });

      setWeekSchedule(updatedWeekSchedule);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
};

  useEffect(() => {
    
    

    fetchEmployee();
  }, [id]);

  const getDayOfWeek = (dayNumber) => {
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return daysOfWeek[dayNumber];
  };

  const updateTime = async (id, time) => {
    try {
      const response = await axios.put(`http://52.78.236.151:8000/api/update/week/${id}/`, {
        start_time: `${time.startHour}:${time.startMinute}:00`,
      });

      fetchEmployee();
    } catch (error) {
      console.error('Error updating start time:', error);
    }
  };

  const updateUsername = async (username) => {
    try {
      await axios.put(`http://52.78.236.151:8000/api/users/update/${id}/`, {
        username,
      });
      fetchEmployee();
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const updatePin = async (pin) => {
    try {
      await axios.put(`http://52.78.236.151:8000/api/users/update/${id}/`, {
        pin,
      });
      fetchEmployee();
    } catch (error) {
      console.error('Error updating PIN:', error);
    }
  };

  const updateWage = async (hourly_wage) => {
    try {
      await axios.put(`http://52.78.236.151:8000/api/users/update/${id}/`, {
        hourly_wage,
      });
      fetchEmployee();
    } catch (error) {
      console.error('Error updating hourly wage:', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message.
  }

  return (
    <div>
        <Sidebar></Sidebar>
            <div className='ml-64'>
                <div className='flex px-2'>
                    <div className=" w-1/4 mx-auto  mt-10 p-4 border rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                                </label>
                                <p className="text-gray-800">{employee.username}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">
                                PIN
                                </label>
                                <p className="text-gray-800">{employee.pin}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourlyWage">
                                Hourly Wage
                                </label>
                                <p className="text-gray-800">{employee.hourly_wage}₩</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Week Schedule</label>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white shadow-md rounded-xl">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                        <th className="px-4 py-2">Day</th>
                                        <th className="px-4 py-2">Start Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {employee.week_schedules.map((schedule, index) => (
                                        <tr key={index} className={(index % 2 === 0) ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-4 py-2">{getDayOfWeek(schedule.day_of_week)}</td>
                                            <td className="px-4 py-2">{schedule.start_time}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                

    

            <div className="w-full mx-12  mt-10 p-4 border rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create a New User</h2>
                <div className="mb-4 flex px-2 items-center">
                    <label className="block mx-3 text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mx-10 focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                        type="text"
                        defaultValue = {employee.username}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <button onClick={()=> updateUsername(formData.username)} className='bg-blue-600 p-2 rounded-md shadow-md text-white px-10 mr-10'>Update</button>
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                </div>
                {/*                        
                <div className="mb-4 flex px-2 items-center">
                <label className="block mx-3 text-gray-700 text-sm font-bold mb-2" htmlFor="pin">PIN</label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 mx-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pin ? 'border-red-500' : ''}`}
                    type="text"
                    name="pin"
                    defaultValue = {employee.pin}
                    value={formData.pin}
                    onChange={handleChange}
                />
                <button  onClick={()=> updatePin(formData.pin)} className='bg-blue-600 p-2 rounded-md shadow-md text-white px-10 mr-10'>Update</button>
                {errors.pin && <p className="text-red-500 text-xs italic">{errors.pin}</p>}
                </div>*/}
                <div className="mb-4 flex px-2 items-center">
                    <label className="block mx-3 text-gray-700 text-sm font-bold mb-2" htmlFor="hourly_wage">Hourly Wage</label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 mx-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.hourly_wage ? 'border-red-500' : ''}`}
                        type="text"
                        name="hourly_wage"
                        defaultValue = {employee.hourly_wage}
                        value={formData.hourly_wage}
                        onChange={handleChange}
                    />
                    <button  onClick={()=> updateWage(formData.hourly_wage)} className='bg-blue-600 p-2 rounded-md shadow-md text-white px-10 mr-10'>Update</button>
                    {errors.hourly_wage && <p className="text-red-500 text-xs italic">{errors.hourly_wage}</p>}
                </div>

                <div className="w-full mx-12 mt-10 p-4">
                        <label className="block mx-4 text-gray-700 text-sm font-bold mb-2">
                            Week Schedule
                        </label>
                        <div className="mb-4 px-8 items-center mt-8">
                            {Object.keys(weekSchedule).map((day) => (
                            <div key={day} className="mb-2 mx-3 flex">
                                <label className="text-gray-700 mt-2 mx-2 text-sm">{day}</label>
                                <input
                                className="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name={`${day}-startHour`}
                                placeholder="HH"
                                value={weekSchedule[day].startHour}
                                onChange={handleWeekScheduleChange}
                                />
                                :
                                <input
                                className="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name={`${day}-startMinute`}
                                placeholder="MM"
                                value={weekSchedule[day].startMinute}
                                onChange={handleWeekScheduleChange}
                                />
                                <button
                                onClick={() => updateTime(weekSchedule[day].id, weekSchedule[day])}
                                className="p-2 px-3 bg-blue-600 mx-2 rounded-md shadow-md text-white"
                                >
                                Update
                                </button>
                            </div>
                            ))}
                        </div>

                </div>
            </div>
            </div>
    </div>
    </div>
  );
};

export default EmployeeDetail;
