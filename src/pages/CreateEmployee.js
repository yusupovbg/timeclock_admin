import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getDayNumber(dayName) {
  const days = {
    
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
  return days[dayName];
}

function UserForm() {
  const navigator = useNavigate();
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
    const time = { ...weekSchedule[day] };
  
    if (timePart === 'startHour') {
      // Update the startHour
      time.startHour = value;
    } else if (timePart === 'startMinute') {
      // Update the startMinute
      time.startMinute = value;
    }
  
    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: time,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Combine form data and week schedule data
        const userData = {
          ...formData,
          week_schedules: Object.keys(weekSchedule).map((day) => ({
            day_of_week: getDayNumber(day),
            start_time: `${weekSchedule[day].startHour}:${weekSchedule[day].startMinute}`,
          })),
        };

        console.log(userData);

        // Send a POST request to your Django API endpoint to create a new user
        const response = await axios.post('http://52.78.236.151/api/users/', userData);

        if (response.status === 201) {
          setSuccess(true);
          navigator('/user');
        } else {
          console.error('Failed to create a new user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (success) {
      // Clear the form and reset success state after a successful submission
      setFormData({
        username: '',
        pin: '',
        hourly_wage: '',
      });
      setWeekSchedule({
        Sunday: { startHour: '00', startMinute: '00' },
        Monday: { startHour: '00', startMinute: '00' },
        Tuesday: { startHour: '00', startMinute: '00' },
        Wednesday: { startHour: '00', startMinute: '00' },
        Thursday: { startHour: '00', startMinute: '00' },
        Friday: { startHour: '00', startMinute: '00' },
        Saturday: { startHour: '00', startMinute: '00' },
      });
      setSuccess(false);
    }
  }, [success]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">PIN</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pin ? 'border-red-500' : ''}`}
            type="text"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
          />
          {errors.pin && <p className="text-red-500 text-xs italic">{errors.pin}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourly_wage">Hourly Wage</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.hourly_wage ? 'border-red-500' : ''}`}
            type="text"
            name="hourly_wage"
            value={formData.hourly_wage}
            onChange={handleChange}
          />
          {errors.hourly_wage && <p className="text-red-500 text-xs italic">{errors.hourly_wage}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Week Schedule</label>
          {Object.keys(weekSchedule).map((day) => (
            <div key={day} className="mb-2">
              <label className="text-gray-700 text-sm">{day}</label>
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
            </div>
          ))}
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create User</button>
      </form>
      {success && <p className="text-green-500 mt-2">User created successfully!</p>}
    </div>
  );
}

export default UserForm;
