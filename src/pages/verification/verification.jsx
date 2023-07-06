import React, { useEffect, useState } from 'react'
import "./verification.css"
import { Link, useLocation } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import axios from "axios"
import { useNavigate } from "react-router-dom";

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function convertPhoneNumber(number) {
    // Remove leading plus sign and any non-digit characters
    var cleanedNumber = number.replace(/[^\d]/g, "");
  
    // Check if the number starts with "0" and has a length of 11
    if (cleanedNumber.startsWith("0")) {
      // Remove the leading "0" and prepend "62"
      return "62" + cleanedNumber.slice(1);
    }
  
    return cleanedNumber; // Return the cleaned number as is
  }

const PVerification = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation()
    const data = parseQuery(location.search)
    const [targetSeconds, setTargetSeconds] = useState(0)
    const [countdown, setCountdown] = useState(60 * 1000);
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1000;
        });
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [targetSeconds]);
  
    const formatTime = (time) => {
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);
  
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
      return <div class="x0059-iJw5sW" data-id="203:2178">{`${formattedMinutes}:${formattedSeconds}`}</div>
    };
  
    const kirimUlang = async () => {
        const phoneNumberFormat = convertPhoneNumber(data.phoneNumber)
        await axios.post("https://kedaitorang.site/custom/request-otp", {
          "phone":`${phoneNumberFormat}@c.us`,
        })
    }

    const onSubmit = async () => {
        try {
            const phoneNumberFormat = convertPhoneNumber(data.phoneNumber)
            await axios.post("https://kedaitorang.site/custom/validate-otp", {
                "phone":`${phoneNumberFormat}@c.us`,
                "otp": otp
            })
            localStorage.setItem("phoneNumber", phoneNumberFormat)
            navigate("/home");
        } catch (error) {
            setError("Kode otp tidak sesuai")
        }
    }

    return (
        <div class="container-center-horizontal">
            <div class="design screen " data-id="18:557">
                <button to="/home" onClick={() => onSubmit()} className="button-large-tcQZxA" data-id="24:203">
                    <div class="konfirmasi-B8xXa7" data-id="24:204">Konfirmasi</div>
                </button>
                <div class="icon-tcQZxA" data-id="24:219"><img class="mail-sxkD15 anima-loading-result" data-id="24:222"
                    src="/assets/icon-1.png" alt="mail" style={{ visibility: 'visible' }} />

                </div>
                <div class="frame-27-tcQZxA frame-27" data-id="24:226">
                    <div class="frame-26-FXmYyg" data-id="24:225">
                        <div class="masukkan-kode-otp-HFRfiV" data-id="24:200">Masukkan Kode OTP</div>
                        <p class="kode-telah-dikirimka-HFRfiV dmsans-normal-gunsmoke-14px" data-id="24:224"><span
                            class="span0-xDz2NL dmsans-normal-gunsmoke-14px">Kode telah dikirimkan ke nomor </span><span
                                class="span1-xDz2NL span1">{data.phoneNumber}</span></p>

                    </div>
                    <div class="frame-28-FXmYyg frame-28 jc" data-id="24:229">
                    <OtpInput
                        value={otp}
                        onChange={(otp) => {
                            setOtp(otp)
                            setError("")
                        }}
                        numInputs={4}
                        renderSeparator={<span className='p-3'></span>}
                        renderInput={(props) => <input {...props} style={{ width: "40px", height: "40px", textAlign: "center"}}/>}
                    />
                        {/* <input type='text' className="frame-21-Dg2nDR" data-id="24:201"></input>
                        <input type='text' className="frame-21-Dg2nDR" data-id="24:201"></input>
                        <input type='text' className="frame-21-Dg2nDR" data-id="24:201"></input>
                        <input type='text' className="frame-21-Dg2nDR" data-id="24:201"></input> */}
                    </div>
                </div>
                <div class="frame-33-tcQZxA" data-id="203:2180">
                    {/* <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
                    {formatTime(countdown)}
                    <p class="belum-menerima-kode-kirim-ulang-iJw5sW" data-id="203:2179"><span
                        class="span0-ftaKAu dmsans-normal-gunsmoke-14px">Belum menerima kode? </span>
                        <span class="span1-ftaKAu span1" onClick={() => {
                            setCountdown(60 * 1000)
                            setTargetSeconds(targetSeconds+1)
                            kirimUlang()
                        }}>Kirim Ulang</span></p>
                        <p style={{ color: "red"}}>{error}</p>
                </div>

            </div>
        </div>

    )
}

export default PVerification


{/* <div className="container-center-horizontal">
            <div className="design screen " data-id="18:557">
                <Link to="/home" className="button-large-tcQZxA" data-id="24:203">
                    <div className="konfirmasi-B8xXa7" data-id="24:204">Konfirmasi</div>

                </Link>
                <img className="icon-tcQZxA anima-loading-result" data-id="24:219"
                    src="https://cdn.animaapp.com/projects/643f776f1977c0b14b554589/releases/643f777cd08f941208d32ca5/img/icon@2x.png" alt="icon"/>

                    <div className="frame-27-tcQZxA frame-27" data-id="24:226">
                        <div className="frame-26-FXmYyg" data-id="24:225">
                            <div className="masukkan-kode-otp-HFRfiV" data-id="24:200">Masukkan Kode OTP</div>
                            <p className="kode-telah-dikirimka-HFRfiV" data-id="24:224"><span className="span0-xDz2NL">Kode telah dikirimkan ke
                                nomor </span><span className="span1-xDz2NL">{data.phoneNumber}</span></p>

                        </div>
                        <div className="frame-28-FXmYyg frame-28" data-id="24:229">
                            <input type='text' className="frame-21-Dg2nDR" data-id="24:201"></input>
                            <input type='text' className="frame-21-Dg2nDR frame-27" data-id="24:227"></input>
                            <input type='text' className="frame-21-Dg2nDR frame-28" data-id="24:230"></input>
                            <input type='text' className="frame-21-Dg2nDR" data-id="24:232"></input>
                        </div>
                    </div>
            </div>
        </div> */}