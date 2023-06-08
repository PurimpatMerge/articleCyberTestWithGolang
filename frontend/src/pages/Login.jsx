import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import bg from '../assets/bg-room.jpg';
import Navbar from '../components/home/Navbar';

const Login = () => {
    const [credentials, setCredentials] = useState({
        uemail: '',
        password: '',
      });
      console.log(credentials);
      const navigate = useNavigate();
    
    //   const { dispatch } = useContext(AuthContext);
    
      // Show Password?
      const [showPassword, setShowPassword] = useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
   
        try {
        const response = await axios.post('http://localhost:8000/v1/api/auth/login', credentials);
        const { accessToken,userid } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userid', userid);
     
          navigate('/');
        } catch (err) {
      console.log(err);
        }
      };

  return (
    <div>
      <img src={bg} alt="bg" className="absolute h-screen bg-cover w-full" />
      <Navbar />
      <div className="container mx-auto py-20">
        <div className="border border-gray-200 rounded-lg  shadow-lg p-10 text-center md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto backdrop-blur-sm bg-white/30">
          <div>
            <h1 className="text-3xl">LOGIN</h1>
          </div>
          <div className="flex flex-col">
            {/* Email */}
            <FormControl variant="standard">
            <InputLabel>Email</InputLabel>
            <Input
              onChange={handleChange}
              id="uemail"
              value={credentials.uemail}
            /> 
             </FormControl>
            <FormControl variant="standard">
            {/* Password */}
              <InputLabel>Password</InputLabel>
              <Input
                onChange={handleChange}
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          {/* Button */}
          <div className="my-5">
            <button onClick={handleClick} className="rounded-full bg-gray-500 p-5 w-1/2 hover:scale-105 duration-100 text-white shadow-md">
              Login
            </button>
          </div>
          {/* Register */}
          <div>
            <Link to="/register" className="hover:text-indigo-400 mx-5">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom-0 absolute left-1/2 -translate-x-1/2">
        <p>&copy;2023 Purimpat</p>
      </div>
    </div>
  );
};

export default Login;
