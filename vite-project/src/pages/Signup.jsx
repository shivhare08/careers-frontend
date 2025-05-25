import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const nameRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const passwordRef = useRef();

    async function calling() {

        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const city = cityRef.current.value;
        const password = passwordRef.current.value;

        await axios.post("http://localhost:8520/user/signup", {
            name,
            phone,
            city,
            password
        })

        alert("you have sigined up")
        navigate('/')
    }
    return (
        <>
            <div className="w-screen h-screen bg-amber-200 flex-col flex justify-center">
                <div className="flex justify-center">
                    <div className="w-2xl h-80 bg-white  rounded">
                        <h3 className="text-2xl text-center pt-8">Welcome , careers portal</h3>
                        <div className="flex justify-center">
                            <div className="w-56">
                            <marquee className="text-blue-800" direction="left" loop="">
                                <p>find the good career for you</p>
                            </marquee>
                        </div>
                        </div>
                        
                        <div className="flex justify-center">
                            <div className="mt-1">
                                <p className="text-xl mb-2 font-semibold text-center">Login</p>
                                <Input reference={phoneRef} x={"text"} y={"phone"} mode={"numeric"}/>
                                <br/>
                                <Input reference={phoneRef} x={"password"} y={"password"} mode={"none"}/>
                                <br/>
                                <Button fun={calling}/>
                                <div className="flex justify-between">
                                    <p className="text-blue-950 underline" >Signup here</p>
                                    <p className="text-blue-950 underline">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Input reference={nameRef} x={"text"} y={"name"} />
            <Input reference={phoneRef} x={"number"} y={"phone"} />
            <Input reference={cityRef} x={"text"} y={"city"} />
            <Input reference={passwordRef} x={"password"} y={"password"} />
            <Button fun={calling} /> */}
        </>
    )
}

function Input(props) {
    return (
        <>
            <input className="border border-zinc-300 rounded w-72 pl-2 p-1 mt-1" ref={props.reference} inputMode={props.mode} type={props.x} placeholder={props.y} />
        </>
    )
}



function Button(props) {

    return (
        <>
            <button className="bg-red-700 border border-b-black w-72 text-white p-1 rounded" onClick={props.fun} type="submit">signup</button>
        </>
    )
}