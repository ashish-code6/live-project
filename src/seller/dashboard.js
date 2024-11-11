import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Mydashboard = () => {
  let [catlist, setCategory] = useState(0);
  let[newproduct,setNewproduct]=useState(0);
  const getCategory = () => {
    let url = "http://localhost:1234/categoryapi/";
    fetch(url)
      .then((response) => response.json())
      .then((catArray) => {
        setCategory(catArray.length);
      });
  };
  const getProduct = () => {
    let url = "http://localhost:1234/productapi/";
    fetch(url)
      .then((response) => response.json())
      .then((productArray) => {
        setNewproduct(productArray.length);
      });
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);
  
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="text-center col-xl-12 text-secondary">
          <h1>Seller Dashboard</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-xl-3 text-center">
        <Link to="/category" className="text-decoration-none">
         <i className="fa fa-database fa-5x text-info"></i>
         <h3 className="text-info"> Product Category({catlist})</h3>
         </Link>
        </div>
        <div className="col-xl-3 text-center">
        <Link to="/productlist" className="text-decoration-none">
          <i className="fa fa-briefcase fa-5x text-primary"></i>
          <h3 className="text-primary">Total Product({newproduct}) </h3>
          </Link>
        </div>
        <div className="col-xl-3 text-center">
        <Link to="/order" className="text-decoration-none">
          <i className="fa fa-headset fa-5x text-success"></i>
          <h3 className="text-success">Order Recieved</h3>
          </Link>
        </div>
        <div className="col-xl-3 text-center">
        <Link to="/new-product" className="text-decoration-none">
          <i className="fa fa-plus fa-5x text-warning"></i>  
          <h3 className="text-warning">Add Product</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mydashboard;
