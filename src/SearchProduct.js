import Header from "./Header";
import { useState } from "react";
import { Table } from "react-bootstrap";

function SearchProduct() {

    const [data,setData]=useState([])

   async function search(key)
    {
        if(key.length>1){
            let result= await fetch("http://localhost:8000/api/search/"+key)
            result = await result.json();
            console.warn(result)
            setData(result)

        }
      
    }
  
  

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">

        <h1> Search Product</h1>
        <br/>
        <br/>
        <input onChange={(e)=>search(e.target.value)} className="form-control" type="text" placeholder="Search "/>
        {
            data.length>0?
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
    
              </tr>
            </thead>
            <tbody>
              {
                  data.map((item)=>
                  <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <th>{item.price}</th>
                <td><img style={{width:140}} src={"http://localhost:8000/"+item.file_path} alt="nothing here"/></td>
                
    
    
    
              </tr>)
              }
              
            </tbody>
          </Table>
          :null
        }

      </div>

      
    </div>
  )
}
export default SearchProduct
