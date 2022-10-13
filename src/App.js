import Navabr from "./Navbar/Navabr";
import { BrowserRouter,Routes, Route} from "react-router-dom"

//import Products from "./components/Products";
import Signup from "./components/Signup";
import PrivateCompoent from "./components/PrivateCompoent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";


function App() {
  return (
    <>
    <BrowserRouter>
    <Navabr/>
    <Routes>
      <Route element={<PrivateCompoent/>}>
      <Route path="/" element={<ProductList/>} />
      <Route path="/add-product" element={<AddProduct/>} />
      <Route path="/update/:id" element={<UpdateProduct/>} />
      <Route path="/logout" element={<h3>add logout</h3>} />
      
    </Route>

      <Route path="/signup" element = {<Signup/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
 