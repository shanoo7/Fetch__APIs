import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get("https://custom-apis-3.onrender.com/api/products?q="+search)
        console.log(response.data)
        setProduct(response.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    })()

  }, [search])

  return (
    <>
      <h1>API CALLING</h1>
      {loading && <h2>Loading... Please Wait !</h2>}
      {error && <h2>Something Went Wrong</h2>}
      {product.length === 0 && error !== true && loading !== true && <h2 style={{ color: "red" }}>Not Found</h2>}
      <h3 style={{color:"grey"}}>Length of Products : {product.length}</h3>
      <input type='text' value={search} placeholder='search names' onChange={(e) => setSearch(e.target.value)} />
      <h2>{product.map((product, index) => (
        <li style={{ listStyle: "none" }} key={index}>{product.name}</li>
      ))}</h2>

    </>
  )
}

export default App;