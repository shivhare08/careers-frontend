import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Model from "../components/Model"
import Phonesize from "../components/Phonesize"

export default function Contact() {
    const [model, setModel] = useState(false)
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const [mobilmodel, setMobilmodel] = useState(false);
    const desigh = "flex justify-evenly"
    const opacitytDesign = "opacity-20"


    const navigate = useNavigate()
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    useEffect(() => {
        async function data() {
            const userdata = await axios.get("http://localhost:8520/user/myprofile", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            // setUser(userdata.data.data[0])
            setUser({ userAllData: userdata.data.data[0], imageUrl: userdata.data.data[0].image.url })

        }
        data()

    }, [])

    async function send() {
        const token = localStorage.getItem("token")
        if (token) {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const message = messageRef.current.value;

            const data = await axios.post('http://localhost:8520/contact/message', {
                name,
                email,
                message
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            alert("message is sent")
            navigate('/contact')
        } else {
            alert("login first")
            navigate('/')
        }

    }

    return (
        <>

            <div className="w-screen h-screen flex justify-center">
                <div className="w-screen sm:w-3/5 h-96 bg-white">
                    <p className="sizeFector p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                    <div className="sizeFector flex justify-evenly mt-4">
                        <p onClick={() => {
                            navigate('/home')
                        }} className="cursor-pointer font-semibold ">home</p>
                        <p onClick={() => {
                            navigate('/about')
                        }} className="cursor-pointer font-semibold">about</p>
                        <p onClick={() => {
                            navigate('/jobs')
                        }} className="cursor-pointer font-semibold">jobs</p>
                        <p onClick={async () => {
                            navigate('/contact')
                        }} className="cursor-pointer text-violet-900 font-semibold">contact</p>
                        <p onClick={() => {
                            navigate('/notification')
                        }} className="cursor-pointer font-semibold">notification</p>


                        <p onClick={async () => {
                            setModel(x => !x);
                        }} className="cursor-pointer">
                            <img className="w-12 h-12 rounded-3xl" src={`${user.imageUrl}`} />
                        </p>
                    </div>

                    <div className="flex mt-8 justify-between pl-10 pr-10">
                        <p style={{
                            display: "none"
                        }} className="text-xl phnsize">Careers<span className="text-violet-900">.com</span></p>

                        {/* icon */}
                        <div onClick={() => {
                            setMobilmodel(x => !x);
                        }} style={{
                            display: "none"
                        }} className="phnsize cursor-pointer">
                            <p>‖‖</p>
                        </div>
                    </div>
                    <br />

                    <div className={model ? desigh : null}>
                        <div className={model ? opacitytDesign : null}>
                            <div>
                                {mobilmodel ? <Phonesize /> : null}
                            </div>
                        </div>
                        {/* <div className="sizeFector">
                            {model ? <Model /> : null}
                        </div> */}
                    </div>
                    
                    <div className={`bg-violet-900 ${model?opacitytDesign:null} h-full text-white pt-5`}>
                        <h1 className="text-center text-base sm:text-xl font-bold">send your query to us</h1>
                        <div className="flex justify-center mt-5">
                            <div className="h-96">
                                <Input reference={nameRef} x={"text"} y={"name"} /><br />
                                <Input reference={emailRef} x={"email"} y={"email"} /><br />
                                <Textarea reference={messageRef} /><br />
                                <Button fun={send} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className=" p-2 text-xs sm:text-base text-center mt-5">2025 Careers<span className="text-violet-900">.com</span>. All rights reserved.</p>
                    </div>
                </div>
                <div className="sizeFector mt-20">
                    {model ? <Model /> : null}
                </div>
            </div>
        </>
    )
}


function Input(props) {
    return (
        <>
            <input className="border border-zinc-300 rounded w-64 sm:w-96 pl-2 p-1 mt-3" ref={props.reference} inputMode={props.mode} type={props.x} placeholder={props.y} />
        </>
    )
}


function Textarea(props) {
    return (
        <>
            <textarea ref={props.reference} className="border border-zinc-300 rounded pl-2 p-1 mt-3 w-64 sm:w-96" placeholder="text any query.." type="number" rows={4}></textarea>
        </>
    )
}


function Button(props) {

    return (
        <>
            <button className="bg-amber-50 cursor-pointer border border-b-black w-64 sm:w-96 text-black p-2  rounded" onClick={props.fun} type="submit">send</button>
        </>
    )
}