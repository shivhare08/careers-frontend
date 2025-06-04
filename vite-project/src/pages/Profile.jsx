import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Model from "../components/Model"
import Phonesize from "../components/Phonesize"

export default function Profile() {
    const [model, setModel] = useState(false)
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const [mobilmodel, setMobilmodel] = useState(false);
    const [myapp, setMyapp] = useState([])
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

            const myApplication = await axios.get("https://careers-backend-m1xp.onrender.com/user/myapplications", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setMyapp(myApplication.data.applications);

        }
        data()

    }, [])



    return (
        <>
            <div className="w-screen h-full bg-blue-100  flex justify-center">
                <div className="w-screen h-full sm:w-3/5  bg-white">
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

                    <div >
                        <div className="bg-amber-100 w-full h-60 flex flex-col justify-end">
                            {/* <img className="" src="https://media.licdn.com/dms/image/v2/D4D16AQGW-_PEZgusgw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1737819102573?e=1753920000&v=beta&t=5JETgc0ZM-OokMESQRyU2IQCKjVBuPfOVIL24PYcIzs"/> */}
                            <h1 className="text-center text-white">Background picture</h1>
                            <div className="flex justify-center">
                                <img className="rounded-full w-28 h-28" src={`${user.imageUrl}`} />
                            </div>
                        </div>

                        <h1 className="text-center font-semibold text-xl tracking-wider text-gray-800 mt-2">{user.userAllData.name}</h1>
                        <div>
                            <h1 className="text-center pl-15 pr-15 pt-4 text-md text-black">JAVA + DSA | C/C++ | Javascript | Typescript | Nodejs | Reactjs | HTML | CSS/Tailwind CSS | Bootstrap | Figma | MySQL | Mongodb | Worked as Intern at Pninfosys.</h1>
                        </div>

                        <h1 className="text-center font-semibold text-xl text-violet-600 mt-2">
                            contact - {user.userAllData.phone} <br />
                            city - {user.userAllData.city}
                        </h1>

                        <div className="bg-red">
                            <h1 className="text-center font-semibold mt-5 text-gray-700 underline text-xl sm:text-2xl ">Jobs Applied</h1>
                            <br />
                            {myapp.map(({ title, jobLocation, _id }) => <DetailsComponent
                                key={_id}
                                title={title}
                                location={jobLocation}
                            />)}
                        </div>
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




function DetailsComponent(props) {
    return (
        <>
            <div className="flex justify-center">
                <div className=" w-3/4 h-fit p-2 shadow-xs border-b-0.5 text-gray-800 flex justify-center">
                    <h1 className="font-semibold text-base sm:text-xl">{props.title} - <span className="text-green-800 font-semibold">applied ✅</span></h1>
                    <h1 className=" text-base sm:text-xl">{props.location}</h1>
                </div>
            </div>
        </>
    )
}