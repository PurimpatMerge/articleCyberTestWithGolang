import IconButton from '@mui/material/IconButton';
import { Image } from 'antd';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import bg from '../assets/bg-room.jpg'
import Navbar from '../components/home/Navbar';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {

    //   img
    const [imageURLs, setImageURLs] = useState([]);
    const [images, setImages] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (images?.length < 1) return;
        const newImageUrls = [];
        images?.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);


    const onImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

      const handleSubmit = async () => {
        try {
          let list = [];
      
          if (images.length > 0) {
            list = await Promise.all(
              images.map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
      
                const uploadRes = await axios.post(
                  "https://api.cloudinary.com/v1_1/dwwfqdl79/image/upload",
                  data
                );
      
                const { url } = uploadRes.data;
                return url;
              })
            );
          } else {
            // Set a default image URL if no image is selected
            list = ["https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png"];
          }
      
          const allInfo = {
            ...info,
            upicture: list,
          };
      

          await axios.post(
            `http://localhost:8000/v1/api/users/register`,
            allInfo,
          );

          navigate('/');
        } catch (err) {
          console.log("You're not logged in.");
        }
      };
    return (
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full' />
            <Navbar />
            <div className="container mx-auto py-20">
                <div className="border border-gray-200 rounded-lg  shadow-lg p-10 text-center md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto backdrop-blur-sm bg-white/30">
                    <div>
                        <h1 className='text-3xl'>Register</h1>
                    </div>
                    {/* Upload Image*/}
                    <div className='flex flex-col'>
                        <div>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={onImageChange} />
                                <PhotoCamera />
                            </IconButton>
                            <label className=" text-blue-500">Upload Image</label>
                        </div>
                        <div>
                            {imageURLs.map((imageSrc, index) => (
                                <Image key={index} height={200} src={imageSrc} alt="profileimg" />
                            ))}
                        </div>
                    </div>
                    {/* info */}
                    <div className='grid grid-cols-2 gap-5 text-left'>
                        <div>
                            <TextField label="Username" variant="standard" id="username"onChange={handleChange}/>
                        </div>
                        <div>
                            <TextField label="Password" variant="standard" id="upassword" onChange={handleChange}/>
                        </div>
                        <div>
                            <TextField label="Firstname" variant="standard" id="fname" onChange={handleChange} />
                        </div>
                        <div>
                            <TextField label="Lastname" variant="standard" id="lname" onChange={handleChange}/>
                        </div>
                        <div>
                            <TextField label="Email" variant="standard"id="uemail" onChange={handleChange}/>
                        </div>

                    </div>

                    {/* Button */}
                    <div className='my-5'>
                        <button onClick={handleSubmit} className='rounded-full bg-gray-500 p-5 w-1/2 hover:scale-105 duration-100 text-white shadow-md'>Confirm</button>
                    </div>

                </div>
            </div>
            <div className='bottom-0 absolute left-1/2 -translate-x-1/2'>
                <p>&copy;2023 Purimpat</p>
            </div>
        </div>
    )
}
export default Register;