import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Contact() {
    const navigate = useNavigate()
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

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

            <div className="w-screen h-full bg-gray-200 flex justify-center">
                <div className="w-3/5 h-screen bg-white">
                    <p className=" p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                    <div className="flex justify-evenly mt-4">
                        <p onClick={() => {
                            navigate('/home')
                        }} className="cursor-pointer font-semibold">home</p>
                        <p onClick={() => {
                            navigate('/about')
                        }} className="cursor-pointer font-semibold">about</p>
                        <p onClick={() => {
                            navigate('/jobs')
                        }} className="cursor-pointer font-semibold">jobs</p>
                        <p onClick={() => {
                            navigate('/contact')
                        }} className="cursor-pointer font-semibold text-violet-900">contact</p>
                        <p onClick={() => {
                            navigate('/notification')
                        }} className="cursor-pointer font-semibold">notification</p>
                        <p onClick={() => {
                            localStorage.removeItem("token")
                            navigate('/')
                        }} className="font-semibold cursor-pointer">logout</p>
                    </div>
                    <br />

                    <div className="bg-violet-900 max-h-4/5 text-white">
                        <h1 className="text-center text-xl font-bold pt-15">send your query to us</h1>
                        <div className="flex justify-center mt-5">
                            <div className="h-96">
                                <Input reference={nameRef} x={"text"} y={"name"} /><br />
                                <Input reference={emailRef} x={"email"} y={"email"} /><br />
                                <Textarea reference={messageRef} /><br />
                                <Button fun={send} />
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
            <input className="border border-zinc-300 rounded w-96 pl-2 p-1 mt-3" ref={props.reference} inputMode={props.mode} type={props.x} placeholder={props.y} />
        </>
    )
}


function Textarea(props) {
    return (
        <>
            <textarea ref={props.reference} className="border border-zinc-300 rounded pl-2 p-1 mt-3 w-96" placeholder="text any query.." type="number" rows={4}></textarea>
        </>
    )
}


function Button(props) {

    return (
        <>
            <button className="bg-amber-50 cursor-pointer border border-b-black w-96 text-black p-2  rounded" onClick={props.fun} type="submit">send</button>
        </>
    )
}