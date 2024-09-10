import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((res) => {
        console.log('Res:::',res);
        return setProducts(res.data.products);
      })
      .catch((err) => console.error(`Error fetching products: ${err}`));
  });

  return (
    <div className="App">
      <h1>Product List</h1>
      <table border="1" cellPadding="10" cellSpacing="1">
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Product Description</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <img src={product.images[0]} alt='dummy-img' width="90" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
