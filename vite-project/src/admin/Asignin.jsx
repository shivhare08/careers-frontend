import { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Asignin() {
    const navigate = useNavigate()
    const departmentRef = useRef();
    const passwordRef = useRef();
    const [hide, setHide] = useState("hidden")

    async function calling() {

        const department = departmentRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post("https://careers-backend-m1xp.onrender.com/admin/signin", {
            department,
            password
        })

        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token)
            alert("you have sigined in")
            navigate('/admin/dashboard')
        } else {
            setHide("")
        }

    }
    const css = `text-red-600 ${hide} block text-center`
    return (
        <>
            <div className="w-screen h-screen bg-gray-200 flex justify-center ">
                <div className="w-4/5 sm:w-3/5 h-full bg-white ">
                    <p className=" p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>


                    <div className="flex justify-center text-white mt-10">
                        <div className="w-2xl h-96 bg-violet-900  rounded">
                            <h3 className="text-base sm:text-2xl text-center pt-14">Welcome , careers portal</h3>
                            <div className="flex justify-center">
                                <div className="w-56">
                                    <marquee className="text-white" direction="left" loop="">
                                        <p className="text-xs sm:text-base">find the good career for you</p>
                                    </marquee>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="mt-1">
                                    <p className={css}>something went wrong</p>
                                    <p className="text-xs sm:text-xl mb-2 font-semibold text-center">Login as a admin</p>
                                    {/* <Input reference={departmentRef} x={"text"} y={"department"} mode={"none"} /> */}
                                    <Select reference={departmentRef}/>
                                    <br />
                                    <Input reference={passwordRef} x={"password"} y={"password"} />
                                    <br />
                                    
                                    <Button fun={calling} />
                                    <div className="flex justify-between">
                                        <p onClick={() => {
                                            navigate('/')
                                        }} className="cursor-pointer underline" >User</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

function Input(props) {
    return (
        <>
            <input className="border border-zinc-300 rounded w-48 sm:w-72 pl-2 p-1 mt-1" ref={props.reference} inputMode={props.mode} type={props.x} placeholder={props.y} />
        </>
    )
}

function Select(props) {
    return (
        <>
            <select ref={props.reference} className="border rounded w-48 sm:w-72 pl-2 p-1 mt-1" >
                <option className="bg-neutral-300 text-black" value="department">select department</option>
                <option className="bg-neutral-300 text-black" value="HR">HR</option>
                <option className="bg-neutral-300 text-black" value="Finance">Finance</option>
            </select>        
        </>
    )
}

function Button(props) {

    return (
        <>
            <button className="bg-amber-50 cursor-pointer border border-b-black w-48 sm:w-72 text-black p-2 mt-2 rounded" onClick={props.fun} type="submit">signin</button>
        </>
    )
}