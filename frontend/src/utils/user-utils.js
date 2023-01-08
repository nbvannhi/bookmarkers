import axios from './user-axios';

const getUser = async (userId) => {
  const res = await axios.get(`/user/${userId}`);
  const data = await res.data;
  return data?.user;
}

export default getUser;
