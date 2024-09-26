import { createContext, useState } from "react";
import run from "../config/Gemini";

 export const Context = createContext();


 const ContextProvider = (props)=>{

const [input,setinput] = useState("");
const [recentprompt,setrecentprompt] = useState("")
const [previosprompt,setpreviosprompt] = useState([])
const [showresult,setshowresult] = useState(false)
const [loading,setloading] = useState(false)
const [resultdata,setresultdata] = useState("")

const DelayPara = (index,nextword) => {
    setTimeout(() => {
        setresultdata(prev=>(prev+nextword))
    }, 75*index);
}

const newChat = ()=> {
    setloading(false)
    setshowresult(false)
}

    const onSent = async(prompt)=>{
        setresultdata("")
        setloading(true)
        setshowresult(true)
        let response;
        if (prompt!==undefined) {

            response=await run(prompt)
            setrecentprompt(prompt)
           
           
        }

        else {
            setrecentprompt(input)
            setpreviosprompt(prevs=>[...prevs,input])
             response =  await run(input)
        }
        
       let responsearray = response.split("**")
       let newresponse="" ;
       for (let i=0;i<responsearray.length;i++){
        if(i===0 || i%2 !==1 ){
            newresponse +=responsearray[i];
        }
        else {
            newresponse +="<b>"+responsearray[i]+"</b>";
        }
       }

       let newresponse2 = newresponse.split('*').join("</br>")
      let newresponsearray = newresponse2.split(" ");
      for(let i=0;i<newresponsearray.length;i++){
        const nextword = newresponsearray[i]
        DelayPara(i,nextword+" ")
      }
       setloading(false)
       setinput("")
    }



    const contextValue = {
        previosprompt,setpreviosprompt,onSent,setrecentprompt,recentprompt,showresult,loading,resultdata,input,setinput,newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
 }

 export default ContextProvider