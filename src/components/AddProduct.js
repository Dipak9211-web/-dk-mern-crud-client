import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function AddProduct() {
const [addProduct, setAddProduct] = useState({name:"", price:"", category:"", userId:"", company:"" });
const [userId, setUserId] = useState("")
const [checkLenght, setCheckLenght] = useState([])
const navigate = useNavigate()
useEffect(()=>{
  let userId = JSON.parse(localStorage.getItem('user'))._id
  setUserId(userId)
 
},[])
useEffect(()=>{
  const checkProductData = async()=>{
    let newData = await fetch(`${process.env.BACKEND_URL}/products`, {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    newData = await  newData.json();
      setCheckLenght(newData)
     // console.log(newData.length)     
}
  checkProductData()
},[])


const handleProduct = (e)=>{
  let name = e.target.name;
  let value = e.target.value;
 
  
  setAddProduct({...addProduct, [name]:value, userId:userId})
}

const onAddProduct = async(e)=>{
  e.preventDefault();
    if(checkLenght.length<14){

    if(addProduct.name && addProduct.price && addProduct.category && addProduct.userId && addProduct.company){
      let fetchProduct = await fetch(`${process.env.BACKEND_URL}/add-product`, {
        method:"POST",
        body:JSON.stringify(addProduct),
        headers:{
          "Content-Type":"application/json",
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      fetchProduct = await fetchProduct.json();
      if(fetchProduct){
      navigate("/")
      }
    }else{
      alert("please fill all forms field properly")
    }
    }else{
      alert("sorry: you can add only 20 data")
    }
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">

        <div className="card card-width">
  
  <div className="card-body">
  
          <h3 className='text-center'>Add Product</h3>
          <form>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Electronics Product Name</label>
    <input type="text" name="name" onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">price</label>
    <input type="number" name="price" onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">category</label>
    <input type="text" name="category" onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Company</label>
    <input type="text" name="company" onChange={handleProduct} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div> 
  
 
  <button type="submit" onClick={onAddProduct} className="btn btn-primary">add product</button>
</form>
</div>
</div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct