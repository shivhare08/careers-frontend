import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const nameRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const passwordRef = useRef();
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const handelFilechange = (event) => {
        let imageFile = event.target.files[0]
        setFile(imageFile)


        //preview url
        let generateUrl = URL.createObjectURL(imageFile)
        setPreview(generateUrl)
    }


    const calling = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('please select your image')
            return;
        }

        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const city = cityRef.current.value;
        const password = passwordRef.current.value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('password', password);
        formData.append('image', file)

        await axios.post("https://careers-backend-m1xp.onrender.com/user/signup",
            formData
            // name,
            // phone,
            // city,
            // password,
            // image
        )

        alert("you have sigined up")
        navigate('/')
    }

    return (
        <>
            {/* <div className="flex-col flex justify-center"> */}
            <div className="text-zinc-800">
                <div className="pt-20 min-w-20 h-screen bg-blue-100  rounded">
                    <h3 className="text-xl  font-semibold text-center pt-8">Welcome , careers portal</h3>
                    <div className="flex justify-center">
                        <div className="w-56">
                            <marquee className="text-blue-800" direction="left" loop="">
                                <p>find the good career for you</p>
                            </marquee>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="mt-1">
                            <p className="text-l mb-2 font-semibold text-center">Signup</p>

                            <form onSubmit={calling}>
                                <Input reference={nameRef} x={"text"} y={"name"}  />
                                <br />
                                <Input reference={phoneRef} x={"text"} y={"phone"} mode={"numeric"} />
                                <br />
                                <Input reference={passwordRef} x={"password"} y={"password"}  />
                                <br />

                                <Input reference={cityRef} x={"text"} y={"city"}  />
                                <br />

                                <Input css={""} onChange={handelFilechange} x={"file"}  />
                                {preview ? <img className="w-14 h-14 rounded-xl mt-1" src={preview} /> : null}
                                <br />
                                <Button />
                            </form>

                            <div className="flex justify-between">
                                <p onClick={() => {
                                    navigate('/')
                                }} className="cursor-pointer text-blue-950 underline" >Signin here</p>
                                <p onClick={()=>{
                                    navigate('/admin/signin')
                                }} className="cursor-pointer text-blue-950 underline">Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

function Input(props) {
    return (
        <>
            <input className={`${props.css} border border-zinc-400 rounded w-64  pl-2 p-1 mt-1`} onChange={props.onChange} ref={props.reference} inputMode={props.mode} type={props.x} placeholder={props.y} />
        </>
    )
}



function Button(props) {

    return (
        <>
            <button className="bg-red-700 border cursor-pointer w-64 text-white p-1 rounded" type="submit">signup</button>
        </>
    )
}