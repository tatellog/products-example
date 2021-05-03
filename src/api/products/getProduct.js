import { callApi } from 'api/common';

const getProduct = () => {
  return callApi({
    method: 'GET',
    path: 'https://amazon-products1.p.rapidapi.com/listing'
  });
};

export default getProduct;
