import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Model from "../components/Model"
import Phonesize from "../components/Phonesize"

export default function Myapplication() {
    const [model, setModel] = useState(false)
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const [mobilmodel, setMobilmodel] = useState(false);
    const [myapp , setMyapp] = useState([])
    const desigh = "flex justify-evenly"
    const opacitytDesign = "opacity-20"
    const navigate = useNavigate()

    useEffect(() => {
        async function data() {
            const userdata = await axios.get("https://careers-backend-m1xp.onrender.com/user/myprofile", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            // setUser(userdata.data.data[0])
            setUser({ userAllData: userdata.data.data[0], imageUrl: userdata.data.data[0].image.url })


            const myApplication = await axios.get("https://careers-backend-m1xp.onrender.com/user/myapplications",{
                headers:{
                    "token":localStorage.getItem('token')
                }
            })
            setMyapp(myApplication.data.applications);

            // console.log(myApplication.data.applications);
            
        }

        data()
    }, [])

    

    return (
        <>
            <div className="w-full bg-blue-100 h-full flex justify-center">
                <div className="w-full sm:w-3/5 h-full bg-white">
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
                    {/* data */}
                    <div className="bg-red">
                        <h1 className="text-center font-semibold text-gray-700 text-2xl">My Applications</h1>
                        <br/>
                        {myapp.map(({title , jobLocation , _id})=><DetailsComponent
                            key={_id}
                            title = {title}
                            location={jobLocation}
                        />)}
                    </div>
                    <div className="mt-6 ">
                        <p className="sp-2 text-xs sm:text-base text-center ">2025 Careers<span className="text-violet-900">.com</span>. All rights reserved.</p>
                    </div>
                </div>
                <div className="sizeFector">
                    {model ? <Model /> : null}
                </div>
            </div>
        </>
    )
}


function DetailsComponent(props) {
    return (
        <>
            <div className="flex justify-center">
                <div className=" w-3/4 h-fit mt-4 p-2 shadow-xs border-b-0.5 text-gray-800">
                    <h1 className="font-semibold text-base sm:text-2xl">{props.title} - <span className="text-green-800 font-semibold">applied ✅</span></h1>
                    <h1 className=" text-base sm:text-xl">{props.location}</h1>
                </div>
            </div>
        </>
    )
}