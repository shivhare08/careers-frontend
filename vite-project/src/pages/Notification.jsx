import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Model from "../components/Model";
import Phonesize from "../components/Phonesize"

export default function Notification() {
    return (
        <>
            <Navbar />

        </>
    )
}


// function Notiupdates(){
//     return(
//         <>
//             <div className="w-full bg-red-300">
//                 <Notidata/>
//             </div>
//         </>
//     )
// }

function Notidata() {
    const [notifications, setNotification] = useState([])
    useEffect(() => {
        async function byDef() {
            const data = await axios.get("http://localhost:8520/user/allapplications", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setNotification(data.data.applications);
        }


        byDef()
    }, [])

    return (
        <>
        <div className="flex justify-center">
            <div className="w-2xl ">
                <h1 className="text-center text-2xl text-zinc-700 mt-5 sm:mt-0 font-semibold">latest notification</h1>
                {notifications.map(({ title, createdAt, _id }) => <Box key={_id} title={title} date={createdAt} />)}
            </div>
        </div>
            
        </>
    )
}

function Box(props) {
    const [user, setUser] = useState();

    useEffect(() => {
        async function userData() {
            const userdetails = await axios.get("http://localhost:8520/user/myprofile", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setUser(userdetails.data.data[0].name);
            //console.log(userdetails.data.data[0].name);
            
        }
        userData()
    }, [])

    return (
        <>
            <div className="p-2  bg-violet-100 ml-5 mr-5 mt-2">
                <div className="text-xl underline text-zinc-700">hey {user},<span className="font-semibold">{props.title}</span> job is added at <span className="font-semibold">{props.date}</span></div>
            </div>

        </>
    )
}



function Navbar() {
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const navigate = useNavigate();
    const [model, setModel] = useState(false)
    const [mobilmodel, setMobilmodel] = useState(false);
    const desigh = "flex justify-evenly"
    const opacitytDesign = "opacity-45"
    //const [applymodel , setApplymodel] = useState(true);


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
            <div className="sm:w-screen h-full bg-gray-200 flex justify-center">
                <div className="sm:w-full sm:max-w-3/5 min-w-3/5 h-full bg-white ">
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
                        }} className="cursor-pointer font-semibold ">jobs</p>
                        <p onClick={async () => {
                            navigate('/contact')
                        }} className="cursor-pointer font-semibold">contact</p>
                        <p onClick={() => {
                            navigate('/notification')
                        }} className="cursor-pointer font-semibold text-violet-900">notification</p>


                        <p onClick={async () => {
                            setModel(x => !x);
                        }} className="cursor-pointer">
                            <img className="w-12 h-12 rounded-3xl" src={`${user.imageUrl}`} />
                        </p>
                    </div>

                    <div className="flex mt-8 justify-between pl-10 pr-10">
                        <p style={{
                            display: "none"
                        }} className="text-xl phnsize"> Careers<span className="text-violet-900">.com</span></p>

                        {/* icon */}
                        <div onClick={() => {
                            setMobilmodel(x => !x);
                        }} style={{
                            display: "none"
                        }} className="phnsize cursor-pointer">
                            <p>‖‖</p>
                        </div>
                    </div>

                    <Notidata />
                    <br />

                    <div className={model ? desigh : null}>
                        <div className={model ? opacitytDesign : null}>
                            <div>
                                {mobilmodel ? <Phonesize /> : null}
                            </div>

                        </div>
                        <div className="sizeFector">
                            {model ? <Model /> : null}
                        </div>
                    </div>



                    <div className="mt-6">
                        <p className=" p-2 text-xs sm:text-base text-center mt-5">2025 Careers<span className="text-violet-900">.com</span>. All rights reserved.</p>
                    </div>
                    <br />
                </div>
            </div>
        </>
    )
}