import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios';
import Swal from 'sweetalert2'
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const HomePage = () => {

    const [items, setItems] = useState([]);

    const getItems=()=>{
        axios({
            method:'GET',
            url:'http://localhost:3000/items',
        })
        .then(result=>{
            // console.log(result.data)
            setItems(result.data)
        })
        .catch((err)=>{
            console.log(err.message);
        });
    };

    const [Form, setForm] = useState({
        name : "",
        type :"",
        price :'' ,
        stock :""
    });

    const tambahProduk = async (produk)=>{
        // console.log(Form)
        try {
             await axios({
            method:'POST',
            url:'http://localhost:3000/items',
            data: produk
            });
            getItems();
            // console.log(result.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const submitHandler=()=> {
        tambahProduk(Form);
    }


    const deleteHandler = async (id) => {
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios({
                method: "DELETE",
                url: `http://localhost:3000/items/${id}`,
              });
              getItems();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
        } catch (err) {
          console.log(err);
        }
      };


    useEffect(() => {
        getItems();
    }, []);
    
    // getItems();
    

    return (
        <div className={"container-fluid"}>
            <h1 className='text-left mb-5' >Selamat Dtang</h1>
            <div className={"container"}>
            <div className= "col-2 justify-content-end">

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
           Tambah Data
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Data</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Nama Product</label>
                        <input type="text" className="form-control" onChange={(e)=>setForm({...Form,name:e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Tipe Produk</label>
                        <input type="text" className="form-control" name="tipe" onChange={(e)=>setForm({...Form,type:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Harga Produk</label>
                        <input type="number" className="form-control" name="price" onChange={(e)=>setForm({...Form,price:e.target.value})}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Jumlah Stok</label>
                        <input type="text" class="form-control" name="stok" onChange={(e)=>setForm({...Form,stock:e.target.value}) } />
                    </div>
                    
                    </form>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={()=> submitHandler()} data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            <table className={"table mt-3"}>
                <thead className='text-center'>
                    <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                {items.map((item)=>{
                    const {id, name, type, price, stock} = item;
                    return(
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{type}</td>
                            <td>Rp. {price},-</td>
                            <td>{stock}</td>
                            <td className='text-center'>
                            <button
                                onClick={() => deleteHandler(id)}
                                className="btn btn-sm btn-danger me-4"
                            >
                                <MdDeleteOutline className="me-1" />
                                Delete
                            </button>
                            <button className="btn btn-sm btn-info">
                                <MdOutlineModeEdit className="me-1" />
                                Update
                            </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;
