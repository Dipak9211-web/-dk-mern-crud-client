import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function UpdateProduct() {
    const [updateProduct, setUpdateProduct] = useState({name:"", price:"", category:"", userId:"", company:"" });
   // const [initialData, setInitialData] = useState({name:"", price:"", category:"", userId:"", company:""})
    const params = useParams();
    const navigate = useNavigate()
    console.log(params)
   
    useEffect(()=>{
      getProductDetails();
    },[])
    const getProductDetails = async()=>{
     let result = await fetch(`${process.env.BACKEND_URL}/product/${params.id}`, {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
     });
       result = await result.json();
       if(result){
         setUpdateProduct(result)
       }
       
    }
  
const handleProduct = (e)=>{
  let name = e.target.name;
  let value = e.target.value;
 
  
  setUpdateProduct({...updateProduct, [name]:value})
}

const onUpdateProduct = async(e)=>{
  e.preventDefault();
  let result = await fetch(`${process.env.BACKEND_URL}/product/${params.id}`, {
    method:'Put',
    body:JSON.stringify(updateProduct),
    headers:{
      "Content-Type":"application/json",
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  })
  result = await result.json();
  if(result){
    navigate("/")
  }
  
  
  
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">

        <div className="card card-width">
  
  <div className="card-body">
          <h3 className='text-center'>Update Product</h3>
          <form>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
    <input type="text" name="name" value={updateProduct.name}  onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">price</label>
    <input type="number" name="price"  value={updateProduct.price}  onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">category</label>
    <input type="text" name="category" value={updateProduct.category}  onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Company</label>
    <input type="text" name="company"  value={updateProduct.company}  onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div> 
  
 
  <button type="submit" onClick={onUpdateProduct} className="btn btn-primary">update product</button>
</form>
</div>
</div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct