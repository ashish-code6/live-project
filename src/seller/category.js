import { useState, useEffect } from "react";

const Category = () => {
  const [categoryList, setCategoryList] = useState("");
  const [message, setMessage] = useState("");
  const [getCatList, setGetCatList] = useState([]);

  const save = () => {
    let newCategory = { catlist: categoryList };
    let url = "http://localhost:3000/categoryapi/";
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newCategory),
    };

    fetch(url, postData)
      .then((response) => response.json())
      .then((data) => {
        setMessage(`${data.catlist} saved successfully`);
        setCategoryList("");
        getCategory(); // Refresh the list after saving
      });
  };

  const getCategory = () => {
    let url = "http://localhost:3000/categoryapi/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGetCatList(data);
      });
  };

  const deleteCategory = (id) => {
    let url = `http://localhost:3000/categoryapi/${id}`;
    let postData = { method: "DELETE" };

    fetch(url, postData)
      .then((response) => response.json())
      .then((data) => {
        setMessage(`${data.catlist} deleted successfully`);
        getCategory(); // Refresh the list after deletion
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 mb-4">
            <h3 className="text-center">Manage Category</h3>
            <p className="text-success">{message}</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Category name"
                value={categoryList}
                onChange={(e) => setCategoryList(e.target.value)}
              />
              <button className="btn btn-primary" onClick={save}>
                Save Category
              </button>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 mb-4">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover text-center align-middle">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getCatList.map((category, index) => (
                    <tr key={index}>
                      <td>{category.id}</td>
                      <td>{category.catlist}</td>
                      <td>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="btn btn-danger"
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </>
  );
};

export default Category;
