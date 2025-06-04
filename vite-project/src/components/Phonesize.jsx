import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Phonesize() {
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const navigate = useNavigate();
    const [model, setModel] = useState(false)

    useEffect(() => {
        async function data() {
            const userdata = await axios.get("https://careers-backend-m1xp.onrender.com/user/myprofile", {
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
            <div className="flex flex-col justify-center w-full h-full bg-white">
                <div className="bg-violet-200 flex justify-center p-4  mt-2">
                    <div>
                        <p onClick={async () => {
                            setModel(x => !x);
                        }} className="cursor-pointer">
                            <img className="w-16 h-16 rounded-4xl" src={`${user.imageUrl}`} />
                        </p>
                        <p onClick={() => {
                            navigate('/home')
                        }} className="cursor-pointer ml-3 mt-2 font-semibold text-violet-900">Home</p>
                        <p onClick={() => {
                            navigate('/about')
                        }} className="cursor-pointer ml-3 mt-2  font-semibold">About</p>
                        <p onClick={() => {
                            navigate('/jobs')
                        }} className="cursor-pointer ml-3 mt-2  font-semibold">Jobs</p>
                        <p onClick={async () => {
                            navigate('/contact')
                        }} className="cursor-pointer ml-3 mt-2  font-semibold">Contact</p>
                        <p onClick={() => {
                            navigate('/notification')
                        }} className="cursor-pointer ml-3 mt-2  font-semibold">Notification</p>
                    </div>

                </div>

            </div>
            {/* </div> */}
        </>
    )
}
