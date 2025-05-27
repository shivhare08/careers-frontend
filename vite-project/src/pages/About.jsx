import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Model from "../components/Model"
import Phonesize from "../components/Phonesize"

export default function About() {
    const [model, setModel] = useState(false)
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const [mobilmodel, setMobilmodel] = useState(false);
    const desigh = "flex justify-evenly"
    const opacitytDesign = "opacity-20"
    const navigate = useNavigate()

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

    

    return (
        <>
            <div className="w-screen bg-blue-100 h-screen flex justify-center">
                <div className="w-screen sm:w-3/5 h-full bg-white">
                    <p className="sizeFector p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                    <div className="sizeFector flex justify-evenly mt-4">
                        <p onClick={() => {
                            navigate('/home')
                        }} className="cursor-pointer font-semibold ">home</p>
                        <p onClick={() => {
                            navigate('/about')
                        }} className="cursor-pointer text-violet-900 font-semibold">about</p>
                        <p onClick={() => {
                            navigate('/jobs')
                        }} className="cursor-pointer font-semibold">jobs</p>
                        <p onClick={async () => {
                            navigate('/contact')
                        }} className="cursor-pointer font-semibold">contact</p>
                        <p onClick={() => {
                            navigate('/notification')
                        }} className="cursor-pointer font-semibold">notification</p>


                        <p onClick={async () => {
                            setModel(x => !x);
                        }} className="cursor-pointer">
                            <img className="w-12 h-12 rounded-3xl" src={`${user.imageUrl}`} />
                        </p>
                    </div>

                    <div className="flex mt-6 justify-between pl-10 pr-10">
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
                    
                    <div className="pr-15 pl-15">
                        <p className="font-semibold text-gray-700">A career portal is an online platform or website where job seekers can find information about job opportunities, apply for positions, and learn more about a company's work culture, benefits, and hiring process. These portals are typically used by organizations to manage their recruitment process and by candidates to explore and apply for jobs.</p>
                        <h1>This portal ..</h1>
                    </div>

                    <div className="mt-6">
                        <p className=" p-2 text-xs sm:text-base text-center ">2025 Careers<span className="text-violet-900">.com</span>. All rights reserved.</p>
                    </div>
                </div>
                <div className="sizeFector">
                    {model ? <Model /> : null}
                </div>
            </div>
        </>
    )
}



