import React, { useEffect, useState } from 'react';
import { getProduct } from 'api/products';


const Home = () => {
    const [product, setProduct] = useState(false);
    const [errorApi, setErrorApi] = useState(false);

    useEffect(() => {
        getProduct()
          .then((data) => {
            setProduct(data);
          })
          .catch((e) => {
            setErrorApi(e.error);
          })
      }, []);

console.log(product)
  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;