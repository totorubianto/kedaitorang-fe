import React, { useEffect, useState } from 'react'
import './otp.css'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

export const POtp = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [booking, setbooking] = useState(false)
  const [phoneNumber, setphoneNumber] = useState("")

  function convertPhoneNumber(number) {
    // Remove leading plus sign and any non-digit characters
    var cleanedNumber = number.replace(/[^\d]/g, "");
    console.log(cleanedNumber)
    // Check if the number starts with "0" and has a length of 11
    if (cleanedNumber.startsWith("0")) {
      // Remove the leading "0" and prepend "62"
      return "62" + cleanedNumber.slice(1);
    }

    return cleanedNumber; // Return the cleaned number as is
  }


  const onSubmit = async () => {
    const phoneNumberFormat = convertPhoneNumber(phoneNumber)

    const data = await axios.post("https://kedaitorang.site/custom/request-otp", {
      "phone": `${phoneNumberFormat}@c.us`,
    })

    navigate(`/verification/?phoneNumber=${phoneNumber}`)
    navigate(0)
  }

  const checkPrepare = async () => {
    try {
      const id = searchParams.get("id")
      const data = await axios.get(`https://kedaitorang.site/custom/check-table/${id}`)
      setbooking(false)
    } catch (error) {
      setbooking(true)
    }
  }

  useEffect(() => {
    checkPrepare()
  }, [])

  return (
    <div className="container-center-horizontal">
      <div className="design screen " data-id="18:311">
        {
          booking ? (
            <>
              <div className="frame-25-tcQZxA" data-id="24:218">
                <img width={"100px"} className='mb-3' src='/kedai.svg'></img>
                <h1 data-id="24:190 mt-5">Meja sudah dipesan</h1>
                <span>mohon maaf karena meja sudah dipesan, silahkan cari meja lain</span>

              </div>

            </>

          ) : (
            <>
              <div className="frame-25-tcQZxA" data-id="24:218">
                <div className="masukkan-nomor-telepon-F5OxIf" data-id="24:190">Masukkan Nomor Telepon</div>
                <input className="frame-21-F5OxIf" onChange={e => setphoneNumber(e.target.value)} data-id="24:192" placeholder="+6282100192893">
                </input>
              </div>
              <div className='pnptnc'>Lihat <Link to={"/pnp"}><b>Kebijakan Privasi</b></Link> dan <Link to="/tnc"><b>Syarat Ketentuan</b></Link></div>
              <button onClick={onSubmit} className="button-large-tcQZxA" data-id="24:194">
                <div className="daftar-B8xXa7" data-id="24:196">Daftar</div>
              </button>
              <img className="icon-tcQZxA" data-id="24:205"
                src="https://cdn.animaapp.com/projects/643f776f1977c0b14b554589/releases/643f777cd08f941208d32ca5/img/icon@2x.png"
                alt="icon" />

            </>


          )
        }
      </div>
    </div >
  )
}
