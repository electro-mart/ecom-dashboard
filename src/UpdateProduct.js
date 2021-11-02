import Header from "./Header";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateProduct(props) 
{
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
 
  
  useEffect(async () => {
    let result = await fetch(
      "http://localhost:8000/api/product/" + props.match.params.id
    );
    result = await result.json();
    setData(result)
    setName(result.name)
    setPrice(result.price)
    setDescription(result.desscription);
    setFile(result.file);
  },[])

 async function editProduct(id)
  {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    let result = await fetch("http://localhost:8000/api/updateproduct/"+id+"?_method=PUT", {
      method: "POST",
      body: formdata
    });
    alert("Product has benn updated")
  }
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
      <h1>Update Product</h1>
      <input className="form-control" type="text"
      onChange={(e) => setName(e.target.value)}
       defaultValue={data.name} /> <br /> <br/>
      <input className="form-control"
      onChange={(e) => setPrice(e.target.value)}
       type="text" defaultValue={data.price} /> <br /> <br/>

      <input className="form-control" 
      onChange={(e) => setDescription(e.target.value)}
      type="text" defaultValue={data.description} /> <br /><br/>
      <input className="form-control"type="file" 
      onChange={(e) => setFile(e.target.files[0])}
      defaultValue={data.file_path} /> <br /> <br/>
      <img  align ="center" style ={{width:300}} src={"http://localhost:8000/"+data.file_path} /> <br /> <br/>


      <button onClick={()=>editProduct(data.id)}> Update</button>
      </div>


    </div>
  );
}
export default withRouter(UpdateProduct)
