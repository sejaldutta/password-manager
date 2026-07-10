import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [show, setshow]= useState(false)
  const [passwordArray, setpasswordArray] = useState([])
  const [editId, seteditId] = useState(null)

const getpasswords= async()=>{
let req =await fetch("http://localhost:3000/")
let passwords =  await req.json()
setpasswordArray(passwords)
console.log(passwords)
}

useEffect(()=>{
 getpasswords()
}, [])

// Then the inputs are connected to the state:
  
  const [form, setform]= useState({ site:"", username:"", password:"" })
  const showPassword=()=>{
    setshow(!show)
  }
  const handlechange=(e)=>{
setform({...form, [e.target.name]:e.target.value})
  }

const CopyToClipboard=(text)=>{
toast.success("Password Copied to Clipboard!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
  navigator.clipboard.writeText(text)
}

const deletepassword=async(id)=>{
confirm("Are you sure you want to delete this password?") && setpasswordArray(passwordArray.filter((item)=> item.id != id))
let res = await fetch("http://localhost:3000/",{ method:"DELETE", headers:{"content-Type":"application/json"},body : JSON.stringify({id}) })
}

const editpassword=(id)=>{
const passwordtoedit=passwordArray.find((item)=> item.id === id)
setform(passwordtoedit)
seteditId(id)
}

const save = async() => {
  if(form.site.length>5 && form.username.length>2 && form.password.length>5){
  toast.success("Password saved successfully!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });
  if (editId) {
      const updated = { ...form, id: editId };

      setpasswordArray(
        passwordArray.map((item) =>
          item.id === editId ? updated : item
        )
      );

      await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      seteditId(null);
    } else {
      const newPassword = {
        ...form,
        id: uuidv4(),
      };

      setpasswordArray([...passwordArray, newPassword]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
    }

    setform({
      site: "",
      username: "",
      password: "",
    });
  }
else{
  toast.error("Please enter password, name and Url with length greater than 5", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}}

  return (
    <div>
      <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      /> 

         {/* bg code copied from bg.ibelick */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">

                </div>
                </div>
<div className="px-4 md:px-0 md:flex md:justify-center">
                <div className="text-black flex flex-col p-4 ">
<input onChange={handlechange} value={form.site} type="text" placeholder = "Enter website URL" className="border border-purple-500 shadow-lg h-8.5 p-3 w-full md:min-w-6xl rounded-full "  name="site" id=""/>
<div className="flex w-full flex-col md:max-w-6xl md:flex-row my-3">
    <input onChange={handlechange} type="text" value={form.username} placeholder="Enter username " name="username" id="" className="p-3 border border-purple-500 shadow-lg h-8.5 rounded-full md:mr-4 w-full"/>

  <div className="relative flex items-center w-full">
    <input onChange={handlechange} type={show? "text":"password"} value={form.password} placeholder="Enter Password" name="password" id="" className="p-3 border border-purple-500 shadow-lg h-8.5 rounded-full w-full mt-3 md:mt-0"/>
    <span className="absolute right-0 p-3 mt-3 md:mt-auto cursor-pointer" onClick={showPassword}>
      <img src={show ? "/eye.svg": "/showeye.svg"} alt="Paswword" className="w-5 h-5"/>
    </span>
</div>

</div>
<div className="w-full md:max-w-6xl flex justify-center">
<button onClick={save} className="cursor-pointer bg-purple-500 text-white rounded-full text-lg min-w-fit md:w-24 mt-3 p-1.5 flex items-center justify-center border-1 border-black hover: bg-purple-700 ">Save
    <lord-icon
    src="https://cdn.lordicon.com/tsrgicte.json"
    trigger="hover"
    stroke="bold"
   style={{width:"35px", height:"35px", margin:"0 0 0 5px"}} >
</lord-icon>
  
</button>
 </div>

<div className='saved mt-9'>
<h2 className='text-2xl text-purple-700 font-bold'>Saved Passwords</h2>
{passwordArray.length === 0 && <p className='text-lg'>No saved passwords.</p>}
{passwordArray.length != 0 && 
<div className='overflow-x-auto'>
<table className="w-full md:min-w-6xl mt-1 mb-15">
  <thead className='border bg-purple-800 text-white'>
    <tr>
      <th className='text-left p-1'>Sitename</th>
      <th className='text-left'>Username</th>
      <th className='text-left'>Password</th>
      <th className='text-left'>Actions</th>
    </tr>
  </thead>

  <tbody>
    {passwordArray.map((item)=>{
      return <tr className='bg-purple-100 border border-white border-2'>
      <td className='px-1 py-2 break-all'>
        <a href={item.site} target='_blank'>{item.site}</a>
        </td>
      <td>{item.username}</td>
      {/* <div className='flex items-center'> */}
      <td>{item.password}
        <span className='cursor-pointer' onClick={ ()=>CopyToClipboard(item.password)}>
        <lord-icon
    src="https://cdn.lordicon.com/xuoapdes.json"
    trigger="hover"
    style={{width:"20px", height:"30px", margin:"0 0 0 5px"}}
    >
</lord-icon>
</span>
      </td>
      {/* </div> */}
      <td>
        <span onClick={()=>{deletepassword(item.id)}}className='cursor-pointer'><lord-icon
    src="https://cdn.lordicon.com/xyfswyxf.json"
    trigger="hover"
    style={{}}>
</lord-icon></span>
        <span onClick={()=>{editpassword(item.id)}} className='ml-5 cursor-pointer'>
          <lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    style={{}}>
</lord-icon>
        </span>
      </td>
      
    </tr>
})}
  </tbody>
</table>
</div>
}

</div>
        
                </div>

        
    </div>
    </div>
  )
}

export default Manager;