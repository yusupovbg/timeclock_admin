import React from 'react';
import { Link } from 'react-router-dom';


function EmployeeTable({ users, onDelete }) {
    const handleDeleteClick = (userId) => {
        // Call the onDelete function with the user ID to trigger the delete action
        onDelete(userId);
      };
    
  return (
    <div className="mt-8">
  <table className="w-full shadow-lg rounded-xl divide-y divide-gray-200">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          Wage
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          PIN
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          Edit
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          Delete
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {user.username}
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {user.hourly_wage}₩
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {user.pin}
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
          <Link to={`/employee/${user.id}`} className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">
    Edit
  </Link>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
            <button
              onClick={() => handleDeleteClick(user.id)}
              className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default EmployeeTable;
