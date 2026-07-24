import { Link, useNavigate } from 'react-router-dom';
import {BiUser} from 'react-icons/bi';
import {AiOutlineLock} from 'react-icons/ai';
import {useState} from 'react';
import {loginUser} from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await loginUser(formData);
      alert("login successful");
      navigate("/dashboard");
    }
    catch(error){
      alert(error.message);
    }
  };

    return (
      <div>
        <div className='bg-white rounded-md p-8'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='relative my-4'>
            <input type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                placeholder=" " 
                className='block w-72 py-2.5 px-0 text-sm bg-black/10 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer'/>
            <label htmlFor="" className='text-black/60 absolute text-sm px-4 duration-300 transform -translate-y-6 scale-75 top-3 origin-left peer-focus:left-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none'>Email</label>
            <BiUser className='absolute top-4 right-4'/>
          </div>
          <div className='relative my-4'>
            <input type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}  
                placeholder=" " 
                className='block w-72 py-2.5 px-0 text-sm bg-black/10 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer'/>
            <label htmlFor="" className='opacity-60 absolute text-sm px-4 duration-300 transform -translate-y-6 scale-75 top-3  origin-left peer-focus:left-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none'>Password</label>
            <AiOutlineLock className='absolute top-4 right-4'/>
          </div>
            <button 
                className='w-full mb-4 text-[18px] mt-6 rounded-xl bg-black text-white hover:bg-orange-500 py-2 transition-colors duration-400'
                type="Submit">Login</button>
            <p className="mt-4 text-center">
              New User?{" "}
              <Link to="/register" className="text-orange-500 hover:underline">
                Register
              </Link>
            </p>
            
          
        </form>
        </div>
      </div>
    );
}

export default Login;