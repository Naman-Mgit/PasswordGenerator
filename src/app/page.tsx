"use client"
import { useState,useCallback,useEffect,useRef} from "react";

export default function Home() {
  const [length,setLength]=useState<number>(8);
  const [isnumber,setisnumber]=useState<boolean>(false);
  const [ischarachter,setischarachter]=useState<boolean>(false);

  const [password,setPassword]=useState<string>("");

  const passwordRef=useRef<HTMLInputElement>(null);
  const passwordGenerator=useCallback(()=>{
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let pass="";
      if(isnumber){
         str+="0123456789";
      }
      if(ischarachter){
         str+="!@#$%^&*";
      }
      
      for(let i=0; i<length ; i++){
          const rind=Math.floor(Math.random()*str.length+1);
          pass+=str.charAt(rind);
      }

      setPassword(pass);

  },[length,isnumber,ischarachter,setPassword])
  

  const copyToClipboard=()=>{
     passwordRef.current?.select();
     window.navigator.clipboard.writeText(password);
     
  }

  useEffect(() => {
     passwordGenerator();
  }, [length,isnumber,ischarachter,setPassword,passwordGenerator]);


  return (
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
       <h1 className="text-white text-center">Password Generator</h1>
       <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 bg-yellow-50 text-gray-600" 
           placeholder="password"
           readOnly
           ref={passwordRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-500 " onClick={copyToClipboard}>
             copy
          </button>
       </div>
       <div  className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                 <input type="range" min={8} max={50} value={length} className="cursor-pointer" onChange={(e)=>setLength(Number(e.target.value))}  />
                 <label>length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
                  <input type="checkbox"
                     defaultChecked={isnumber}
                     id="numberInput"
                     onChange={()=>{setisnumber((prev)=>!prev)}}
                  
                  />
                  <label htmlFor="numberInput">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
                  <input type="checkbox"
                     defaultChecked={ischarachter}
                     id="charInput"
                     onChange={()=>{setischarachter((prev)=>!prev)}}
                  />
                  <label htmlFor="charInput">Special Chars</label>
            </div>
       </div>
     </div>
  );
}
