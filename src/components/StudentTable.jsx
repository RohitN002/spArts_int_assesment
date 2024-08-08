import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../api';

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      setStudents(data || []); // Ensure data is an array or fallback to empty array
      setTotalStudents(data?.length || 0); // Set the total number of students
    };
    loadStudents();
  }, []);

  // Filter students based on search query
  const filteredStudents = students.filter(student => {
    const firstName = student.attributes.firstName?.toLowerCase() || '';
    const lastName = student.attributes.lastName?.toLowerCase() || '';
    return firstName.includes(searchQuery.toLowerCase()) || lastName.includes(searchQuery.toLowerCase());
  });

  // Update the total number of students based on the search result
  useEffect(() => {
    setTotalStudents(filteredStudents.length);
  }, [filteredStudents]);

  // Calculate the index of the first and last student for the current page
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;

  // Get the students to display on the current page
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalStudents / itemsPerPage);

  // Handler for changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handler for changing items per page
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Utility function to handle null or undefined values
  const safeValue = (value) => value ?? ' - ';

  // Handler for search query input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="items-per-page" className="mr-2">Items per page:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Parent Contact No</th>
              <th className="px-4 py-2">Parent Email ID</th>
              <th className="px-4 py-2">Current Address</th>
              <th className="px-4 py-2">createdAt</th>
              <th className="px-4 py-2">updatedAt</th>
              <th className="px-4 py-2">city</th>
              <th className="px-4 py-2">state</th>
              <th className="px-4 py-2">publishedAt</th>
              <th className="px-4 py-2">Apartment Name</th>
              <th className="px-4 py-2">apartmentName</th>
              <th className="px-4 py-2">school</th>
              <th className="px-4 py-2">board</th>
              <th className="px-4 py-2">grade</th>
            </tr>
          </thead>
          <tbody>

            {currentStudents.length > 0 ? (
              currentStudents.map((student,index) => (
                <tr key={student.id} className="border-b">
                  <td className="px-4 py-2">{safeValue(index+1)}</td>
                  <td className="px-4 py-2">{safeValue(student.id)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.firstName)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.lastName)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.middleName)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.gender)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.dob)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.bloodGroup)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.parentContactNo)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.parentEmailId)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.currentAddress)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.createdAt)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.updatedAt)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.city)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.state)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.publishedAt)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.apartmentName)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.school)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.board)}</td>
                  <td className="px-4 py-2">{safeValue(student.attributes.grade)}</td>


            
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-2 text-center">No students available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="text-gray-700">{`Total Students: ${totalStudents}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentTable;
