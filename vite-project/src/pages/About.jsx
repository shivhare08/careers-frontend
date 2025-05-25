import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function About(){
 
    const navigate = useNavigate()
   
    return(
        <>
            <>
            <div className="w-screen h-full bg-gray-200 flex justify-center">
                <div className="w-3/5 h-full bg-white">
                    <p className=" p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                    <div className="flex justify-evenly mt-4">
                        <p onClick={()=>{
                            navigate('/home')
                        }} className="cursor-pointer font-semibold">home</p>
                        <p onClick={()=>{
                            navigate('/about')
                        }} className="cursor-pointer font-semibold text-violet-900">about</p>
                        <p onClick={()=>{
                            navigate('/jobs')
                        }} className="cursor-pointer font-semibold">jobs</p>
                        <p onClick={()=>{
                            navigate('/contact')
                        }} className="cursor-pointer font-semibold">contact</p>
                        <p onClick={()=>{
                            navigate('/notification')
                        }} className="cursor-pointer font-semibold">notification</p>
                        <p onClick={()=>{
                            navigate('/logout')
                        }} className="font-semibold cursor-pointer">logout</p>
                    </div>
                <br/>
                
                
                

                </div>
            </div>
        </>
        </>
    )
}

