import axios from 'axios';


export const getAlllist = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/todos/user/100');
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
};
export const createTodo = async (data) => {
  try {
    const response = await axios.post('https://dummyjson.com/todos/add', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// export const deleteTodo = async (id) => {
//   try {
//     const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting data:', error);
//     throw error;
//   }
// };
export const updateTodo = async (id, newData) => {
  try {
    const response = await axios.patch(`https://dummyjson.com/todos/${id}`, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
