import { useState ,useEffect} from 'react'
import './App.css'
import Swal from 'sweetalert2'
import Navigator from './navigator'

function App() {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    fetch("http://localhost:3000/api")
    .then((data)=> data.json())
    .then((data)=>{
      setData(data)
    })
  },[])

  const addToCart = async (nama, image, diskon, harga) => {
    console.log(nama, image, diskon, harga);
    await fetch("http://localhost:3000/api/cart",{
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body :JSON.stringify({
        nama : nama,
        img : image,
        quantity : 1,
        diskon : diskon,
        harga : harga
      })
    })
  }

  return (
    <>
    <Navigator/>
     {data.length === 0 ? <>Loading</>: 
     <div className='display p-5'>
      {
        data.map((value)=>{
          return(
            <>
              <div key={value.id} className="box p-5 hover:scale-110 ease-in-out duration-300 relative">
                <img className='justify-self-center' src={value.image} width = "200px" height="200px" alt="" />
                <p className='truncate'>{value.nama}</p>
                <p>Rp.{value.harga},-</p>
                {value.diskon !== 0 && <p className='z-0 absolute top-0 right-0 p-2 font-bold bg-red-600 text-white'>{value.diskon} Off%</p>}
                <button className='text-white font-bold bg-black rounded-md p-2 hover:bg-gray-500' onClick={()=>{
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Barang Sudah Ditambahkan Kekeranjang',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  addToCart(value.nama, value.image, value.diskon, value.harga)
                }}> Add To Cart</button>
              </div>
            </>
          )
        })
      }
     </div>}
     
    </>
  )
}

export default App
