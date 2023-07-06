import React, { useEffect, useState } from 'react'
import "./menu.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function formatRupiah(bilangan) {
    if (typeof bilangan !== 'number') return "Rp 0"
    var reverse = bilangan.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');

    // Cetak hasil	
    return `Rp ${ribuan}`// Hasil: 23.456.789
}

export const PMenu = () => {
    const [category, setCategory] = useState([])
    const [categoryActive, setCategoryActive] = useState([])
    const [product, setProduct] = useState([])
    const [order, setOrder] = useState({})
    const [cart, setCart] = useState([])
    const [totalBayar, setTotalBayar] = useState()

    const notify = () => toast("Mohon tunggu pesanan selesai");

    const callAPI = async (category) => {
        setCategory([{ _id: "Semua" }, { _id: "Minuman" }, { _id: "Makanan" }])
        const product = await axios.get(`${process.env.REACT_APP_BE_PORT}/custom/get-post?category=${category || "Semua"}`)
        setProduct(product.data.docs)
    }
    useEffect(() => {
        callAPI(category[categoryActive]?._id)
    }, [categoryActive]);

    useEffect(() => {
        let totalAmount = 0
        cart.map(e => totalAmount += e.price * e.quantity)
        setTotalBayar(totalAmount)
    }, [cart]);

    const onPayment = async (cart) => {
        console.log(order)
        if (order > 0) return notify()
        const category = await axios.post(`${process.env.REACT_APP_BE_PORT}/custom/inquiry`, {
            phoneNumber: localStorage.getItem("phoneNumber"),
            amount: totalBayar,
            cart
        })
        console.log(category.data)
        window.snap.pay(category.data.token, {
            onSuccess: function (result) {
                console.log(result, "sucecss")
                /* You may add your own implementation here */

            },
            onPending: function (result) {
                console.log(result, "pending")
                /* You may add your own implementation here */

            },
            onError: function (result) {
                console.log(result, "errorg")
                /* You may add your own implementation here */

            },
            onClose: function () {
                console.log("close")
                /* You may add your own implementation here */

            }
        })
    }

    const getOrder = async () => {
        try {
            const order = await axios.get("https://kedaitorang.site/custom/get-order/" + localStorage.getItem("phoneNumber"))
            setOrder(order.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    const getStatus = (text) => {
        switch (text) {
            case "sedang_diproses":
                return "Sedang Diproses"
                break;
        
            default:
                return "Siap diambil"
                break;
        }
    }

    return (
        <>
            <div className="container-center-horizontal">
                <div className="design screen" data-id="24:519">
                <ToastContainer type='danger'/>
                    <header className="header-tcQZxA" data-id="24:582">
                        <div className="frame-1-3ZbLVd" data-id="24:583">
                            <div className="halo-selamat-datang-vExsLR" data-id="24:584">Halo, Selamat Datang</div>
                            <p className="mau-pesan-apa-hari-ini-vExsLR" data-id="24:585">Mau Pesan Apa Hari Ini?</p>
                        </div>
                        <div className="ellipse-1-3ZbLVd" data-id="24:586">
                        </div>
                        <div className="ellipse-2-3ZbLVd" data-id="24:587">
                        </div>
                        <div className="ellipse-3-3ZbLVd" data-id="24:588">
                        </div>
                        <div className="ellipse-4-3ZbLVd" data-id="24:589">
                        </div>
                        {
                            Object.keys(order).length > 0 ? (
                                <div className="card-3ZbLVd" data-id="24:590">
                                    <div className="icon-lCRXuo" data-id="24:591">
                                        <img className="ureceipt-alt-2dww3Z anima-loading-result"
                                            data-id="24:592" src="/assets/pesanan.png" alt="u:receipt-alt"
                                        />
                                    </div>
                                    <div className="text-lCRXuo text" data-id="24:593">
                                        <div className="pesanan-saya-hBHxUP" data-id="24:594">Pesanan Saya</div>
                                        <div className="x4-pesanan-hBHxUP" data-id="24:595">{order.products.length} Pesanan</div>
                                    </div>
                                    <div className="label-lCRXuo" data-id="24:596">
                                        <div className="sedang-diproses-4MHMjn" data-id="24:597">{
                                            getStatus(order.status)
                                        }</div>
                                    </div>
                                </div>
                            ) : (
                            <div className="card-3ZbLVd" data-id="24:590">
                                <div className="icon-lCRXuo" data-id="24:591">
                                    <img className="ureceipt-alt-2dww3Z anima-loading-result"
                                        data-id="24:592" src="/assets/pesanan.png" alt="u:receipt-alt"
                                    />
                                </div>
                                <div className="text-lCRXuo text" data-id="24:593">
                                    <div className="pesanan-saya-hBHxUP" data-id="24:594">Pesanan Saya</div>
                                    <div className="x4-pesanan-hBHxUP" data-id="24:595">0 Pesanan</div>
                                </div>
                                {/* <div className="label-lCRXuo" data-id="24:596">
                                    <div className="sedang-diproses-4MHMjn" data-id="24:597">Yok dipesanan</div>
                                </div> */}
                            </div>
                            )
                        }

                    </header>
                    <div className="tabs-tcQZxA" data-id="24:928">
                        {category.map((item, index) => (
                            <>
                                <div className="frame-7-qrgnuV" data-id="24:929" onClick={() => setCategoryActive(index)}>
                                    <div className={`roti-bakar-w4WJig ${categoryActive == index ? "cemilan-ksBhvj" : "dmsans-normal-gunsmoke-13px"}`} data-id="24:930">{item._id}</div>
                                </div>
                                {/* <div className="frame-10-qrgnuV" data-id="24:938">
                                <div className="roti-bakar-w4WJig dmsans-normal-gunsmoke-13px" data-id="24:939">Roti Bakar</div>
                            </div> */}
                            </>
                        ))}
                    </div>
                    <div className='wrapper'>
                        {product.map((item, index) => (
                            <div className="item-BQt7ZJ item mb-3" data-id="24:945">
                                <div className="image" data-id="24:946"><img className="image-3-QYu2OM anima-loading-result"
                                    data-id="24:947" src={item.image.url} alt="image 3"
                                />
                                </div>
                                <div className="frame-14" data-id="24:948">
                                    <div className="text-rPEvJa text" data-id="24:949">
                                        <div className="jasuke-jagung-susu-keju-UJYhYT dmsans-normal-shark-13px" data-id="24:950">{item.name}</div>
                                        <div className="rp20000-UJYhYT dmsans-bold-shark-13px" data-id="24:951">{formatRupiah(item.price)}</div>

                                    </div>
                                    {!cart.some(e => e.index == index) || cart.find(e => e.index == index).quantity === 0 ? (
                                        <div className="frame-15" data-id="24:952">
                                            <div className="tambah dmsans-bold-raw-umber-12px" onClick={() => {
                                                const filtered = cart.filter(e => e.index !== index)
                                                console.log(item)
                                                setCart([...filtered, {
                                                    index,
                                                    price: item.price,
                                                    quantity: 1,
                                                    product: item.id
                                                }])
                                            }} data-id="24:953">Tambah</div>
                                        </div>
                                    ) : (
                                        <div className='d-flex' style={{ gap: "6px" }}>
                                            <div className="frame-15" data-id="24:952">
                                                <div className="tambah dmsans-bold-raw-umber-12px" onClick={() => {
                                                    let exist = cart.find(e => e.index == index)
                                                    exist.quantity -= 1
                                                    const filtered = cart.filter(e => e.index !== index)
                                                    setCart([...filtered, exist])
                                                }} data-id="24:953">-</div>
                                            </div>
                                            <div className="frame-15" data-id="24:952">
                                                <input className='tambah dmsans-bold-raw-umber-12px' style={{ border: "none", width: 15 }} type="number" value={cart.find(e => e.index == index).quantity} />
                                            </div>
                                            <div className="frame-15" data-id="24:952">
                                                <div className="tambah dmsans-bold-raw-umber-12px" onClick={() => {
                                                    let exist = cart.find(e => e.index == index)
                                                    exist.quantity += 1
                                                    const filtered = cart.filter(e => e.index !== index)
                                                    setCart([...filtered, exist])
                                                }} data-id="24:953">+</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="container-tcQZx" data-id="1:1607">
                        <div class="frame-20-g03LV0" data-id="1:1608">
                            <div class="total-pembayaran-vzovoX" data-id="1:1609">Total Pembayaran</div>
                            <div class="rp100000-vzovoX" data-id="1:1610">{formatRupiah(totalBayar)}</div>
                        </div>
                        <div class="button-large-g03LV0 button-large" onClick={e => onPayment(cart)} data-id="1:1611">
                            <div class="pesan-sekarang-3MCehr" data-id="1:1612">Pesan Sekarang</div>

                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>


    )
}
