import axios from 'axios';

const API_URL = 'http://3.223.98.72:1337/api/students';

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
