import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Model from "../components/Model";
import Phonesize from "../components/Phonesize";

function Home() {
    const [details, setData] = useState([]);
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const navigate = useNavigate();
    const [model, setModel] = useState(false)
    const [mobilmodel, setMobilmodel] = useState(false);
    const desigh = "flex justify-evenly"
    const opacitytDesign = "opacity-45"

    useEffect(() => {
        async function data() {
            const response = await axios.get("http://localhost:8520/user/allapplications", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setData(response.data.applications)



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
    // console.log(user);
    // console.log(user.imageUrl);
    // console.log(user.da);

    return (
        <>
            <div className="w-screen h-full bg-gray-200 flex justify-center">
                <div className="max-w-4/5 min-w-3/5 h-full bg-white">
                    <p className="sizeFector p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                    <div className="sizeFector flex justify-evenly mt-4">
                        <p onClick={() => {
                            navigate('/home')
                        }} className="cursor-pointer font-semibold text-violet-900">home</p>
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
                        }} className="phnsize">
                            <p><i className="fa-solid fa-bars"></i></p>
                        </div>
                    </div>

                    <br />

                    <div className={model ? desigh : null}>
                        <div className={model ? opacitytDesign : null}>
                            <div>
                                {mobilmodel ? <Phonesize /> : null}
                            </div>

                            <h1 className="text-2xl text-green-900 text-center ">Latest jobs</h1>
                            {details.map(({ title, description, _id, experience, courses, location, aggrement, salary }) => <DetailsComponent key={_id}
                                courseId={_id}
                                title={title}
                                description={description}
                                courses={courses}
                                experience={experience}
                                location={location}
                                aggrement={aggrement}
                                salary={salary}
                            />)}
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


function DetailsComponent(props) {
    return (
        <>
            <div className="flex justify-center">
                <div className=" w-3/4 h-fit mt-4 p-2 shadow-xs border-b-0.5">
                    <h1 className="text-xs">job id - {props.courseId}</h1>
                    <h1 className="font-bold text-xl sm:text-2xl">{props.title} -{props.location}</h1>
                    <h1 className="text-[12px] sm:text-xs">{props.description}</h1>
                    <h1 className="text-base sm:text-xl">batches - {props.courses}</h1>
                    <h1 className="text-base sm:text-xl">experience - {props.experience}</h1>
                    <h1 className="text-base sm:text-xl">job location - {props.location}</h1>
                    <h1 className="text-base sm:text-xl">aggrement - {props.aggrement}</h1>
                    <h1 className="text-base sm:text-xl">salary - {props.salary}</h1>
                    <Button />
                </div>
            </div>
        </>
    )
}


function Button(props) {

    return (
        <>
            <button className="bg-blue-500 border border-b-black mt-2 text-white pl-3 pt-1 pb-1 pr-3 rounded" onClick={props.fun} type="submit">Apply</button>
        </>
    )
}




export default Home