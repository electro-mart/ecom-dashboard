import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {Link} from 'react-router-dom'

function ProductList() {
  const [data, setData] = useState([]);

  useEffect( () => {
      getData()
    
  }, []);
async function deleteOpration(id){

   let result = await fetch("http://localhost:8000/api/delete/"+id,{
       method:'DELETE'
   });
   result=await result.json();
   console.warn(result)
   getData()
     
 }
 async function getData()
 {
    let result = await fetch('http://localhost:8000/api/list');
    result = await result.json();
    setData(result);
 }

  return (
    <div>
      <Header />
      <div className="col-sm-8 offset-sm-2">
      <h1> Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Operation</th>

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
            <td><span onClick={()=>{deleteOpration(item.id)}} className="delete"> Delete</span></td>
            <td><Link to={"update/"+item.id}><span  className="update"> Update</span></Link></td>



          </tr>)
          }
          
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export default ProductList;
