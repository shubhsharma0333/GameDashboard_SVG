import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import InputFeild from '../components/InputFeild'

const Login = () => {
    const[user, setUser] = useState({username:"", password:""})

    const navigate = useNavigate();

    const handleChange= (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/");
    }

  return (
    <div
      className="w-[100wh] h-[100vh] p-2"
      style={{
        background: "linear-gradient(135deg, #2F1B5E, #5D3EBC, #8E7CC3)",
      }}
    >
        <h1 className="heading text-8xl text-[#C1B5E0] p-20 ">
        Welcome To The Game <br /> Dashboard
      </h1>
      <div className='uiBox w-[80%] max-w-[700px] px-5 pt-8 ml-auto mr-auto'>
      <div className="flex flex-col justify-center items-start mt-5">
          <form onSubmit={handleSubmit} className="w-full">
            <InputFeild
              name="username"
              placeholder="johndoe@game.com"
              value={user.username}
              handleChange={handleChange}
              type="text"
              LabelName="Username"
            />
            <InputFeild
              name="password"
              placeholder="*********"
              value={user.password}
              handleChange={handleChange}
              type="password"
              LabelName="Password"
            />
            <button
              type="submit"
              className="heading w-[200px] ml-auto mr-auto h-[45px] text-2xl text-white rounded-[10px] bg-[#5D3EBC] text-center my-10 "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login