import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
       
    },[]);

    const getProducts = async()=>{
        let result = await fetch(`${process.env.BACKEND_URL}/products`, {
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setProducts(result)
        
    }
  //  console.log(products)
//delete operation
const onDelete = async(id)=>{
  let result = await fetch(`${process.env.BACKEND_URL}/${id}`, {
    method:'delete',
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json();
  if(result){
    alert("record is deleted")
    getProducts();//we are calling this api here because we want call this api for new updated list
  }
}

const serachHandle = async(ev)=>{
   let key = ev.target.value;
   if(key){
    let getResult = await fetch(`${process.env.BACKEND_URL}/search/${key}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    getResult = await getResult.json()
    if(getResult){
     setProducts(getResult)
    }
   }else{
    getProducts()
   }
   
}

  return (
    <div className="container">
        <div className="row">
       
            <div className="col-md-12 text-center d-flex justify-content-center">

            <div className="card card-width-add-pd">
  
            <div className="card-body">
    
               

            <h3 className='pt-4 pb-4'>added products list</h3> 
         <input type="text" onChange={serachHandle} placeholder='search by key' className="form-control mb-4" />
  
   <table className="table table-width2">
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Company</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>
  {products.length>0? products.map(val=>{
    const {name, price, category, company, _id} = val;
    return <tr key={_id}>
      <td>{name}</td>
      <td>{price} Rs.</td>
      <td>{category}</td>
      <td>{company}</td>
      <td><button onClick={()=>onDelete(_id)} className="btn btn-danger">delete</button>
          <Link to={`/update/${_id}`} className='btn btn-success '>update</Link>
      </td>
    </tr>
  }):<tr><td><h3 className='mt-4'>No Result Found</h3></td></tr>}
    
    </tbody>
</table>

 </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList