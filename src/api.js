import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};
