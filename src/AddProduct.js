import Header from "./Header";
import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addProduct() {
    console.warn(name, file, price, description);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    let result = await fetch("http://localhost:8000/api/addproduct", {
      method: "POST",
      body: formdata
    });
    alert("Product has benn saved")
  }

  return (
    <div>
      <Header />

      <div className="col-sm-6 offset-sm-3">
        <br />

        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <br />
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          placeholder="file"
        />
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
        />
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />
        <br />
        <button onClick={addProduct}> Add Product</button>
      </div>
    </div>
  );
}
export default AddProduct;
