import axios from "axios";
import { useRef } from "react"
import { useNavigate } from "react-router-dom";

export default function JobAddModal() {
    const navigate = useNavigate()
    const titleRef = useRef();
    const selectRef = useRef();
    const coursesRef = useRef();
    const batchRef = useRef();
    const salaryRef = useRef();
    const locationRef = useRef();
    const aggrementRef = useRef();
    const descriptionRef = useRef();
    const experienceRef = useRef()

    async function courseAdded(){
        const data = await axios.post("http://localhost:8520/admin/addjob",{
            title : titleRef.current.value,
            type : selectRef.current.value,
            experience : experienceRef.current.value,
            courses : coursesRef.current.value,
            batch : batchRef.current.value,
            description : descriptionRef.current.value,
            salary: salaryRef.current.value,
            location: locationRef.current.value,
            aggrement : aggrementRef.current.value
        },{
            headers:{
                "token" : localStorage.getItem('token')
            }
        })
        alert("courses added")
        navigate("/admin/dashboard")
    }
    return (
        <>

            <div>
                <Feilds reference={titleRef} type={"text"} placeholder={"title"} inputMode={"none"} />
                <Select reference={selectRef} />
                <Feilds reference={coursesRef} type={"text"} placeholder={"courses"} inputMode={"none"} />
                <Feilds reference={batchRef} type={"text"} placeholder={"batch"} inputMode={"none"} />
                <Feilds reference={experienceRef} type={"text"} placeholder={"experience"} inputMode={"none"} />
                <Feilds reference={salaryRef} type={"text"} placeholder={"salary"} inputMode={"none"} />
                <Feilds reference={locationRef} type={"text"} placeholder={"location"} inputMode={"none"} />
                <Feilds reference={aggrementRef} type={"text"} placeholder={"aggrement"} inputMode={"none"} />
                <Textarea reference={descriptionRef}/>

                <Button onClick={courseAdded}/>
                <br/>
            </div>


        </>
    )
}


function Feilds(props) {
    return (
        <>
            <div className="flex justify-center">
                <input ref={props.reference} className={`border border-zinc-400 rounded w-60 sm:w-80  pl-2 p-1 mt-1`} inputMode={props.mode} type={props.type} placeholder={props.placeholder} />

            </div>
        </>
    )
}

function Select(props) {
    return (
        <>
            <div className="flex justify-center">
                <select ref={props.reference} className="border-1 border-zinc-400 rounded w-60 sm:w-80 text-zinc-500 pl-2 p-1 mt-1" >
                    <option className="bg-neutral-300 text-black" value="type">type</option>
                    <option className="bg-neutral-300 text-black" value="Internship">Internship</option>
                    <option className="bg-neutral-300 text-black" value="Job">Job</option>
                    <option className="bg-neutral-300 text-black" value="Part-time">Part-time</option>
                    <option className="bg-neutral-300 text-black" value="Contract">Contract</option>
                </select>
            </div>
        </>
    )
}

function Textarea(props) {
    return (
        <>
            <div className="flex justify-center">
                <textarea ref={props.reference} className="border border-zinc-400 rounded p-2 mt-1 w-60 sm:w-80" placeholder="write about job.." rows={2}></textarea>
            </div>    
        </>
    )
}

function Button(props) {
    return (
        <>
            <div className="flex justify-center">
                <button onClick={
                    props.onClick} className="border border-zinc-400 text-white bg-violet-700 rounded p-2 mt-1 w-60 sm:w-80">Submit</button>
            </div>    
        </>
    )
}