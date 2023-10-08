import axios from 'axios';
import Axios from 'axios';

export const fetchImg = async (searchQuery) => {
  const {data} = await axios(
    `https://pixabay.com/api/?key=39039706-642a8919457a778e8308a3f03&page=1&per_page=12&q=${searchQuery}`
  );
  return data;
};
