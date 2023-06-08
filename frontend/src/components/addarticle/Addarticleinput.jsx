import Divider from "@mui/material/Divider";
import { Image } from "antd";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addarticleinput = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    image: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png",
  });

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImages([file]);
    setInfo((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
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
        tags: [info.tags],
        image: list,
      };
  
      const userid = localStorage.getItem("userid");
  
      const accessToken = localStorage.getItem("accessToken");
  
      await axios.post(
        `http://localhost:8000/v1/api/article/createArticle/${userid}`,
        allInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate('/');
    } catch (err) {
      console.log("You're not logged in.");
    }
  };
  

  return (
    <div className="container mx-auto my-10 bg-white p-5 rounded-sm shadow-xl">
      {/* Header */}
      <div>
        <p className="text-4xl">Create Your Article</p>
      </div>
      <Divider />
      {/* Upload Image*/}
      <div className="flex flex-col">
        <div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={onImageChange}
              multiple
            />
            <PhotoCamera />
          </IconButton>
          <label className="text-blue-500">Upload Image</label>
        </div>
        <div>
          {info.image && (
            <Image
              height={400}
              src={info.image}
              alt="profileimg"
              onChange={(e) => setImages(e.target.files)}
            />
          )}
        </div>
      </div>
      {/* add Header */}
      <div className="my-1">
        <p>Title</p>
        <TextField
          variant="outlined"
          className="w-full"
          id="title"
          onChange={handleChange}
        />
      </div>
      <Divider />
      {/* add content */}
      <div className="my-1">
        <p>CONTENT</p>
        <TextareaAutosize
          className="w-full border py-5 border-gray-200 rounded-md"
          label="Header"
          variant="standard"
          id="content"
          onChange={handleChange}
        />
      </div>
      {/* add author */}
      <div className="my-1">
        <p>AUTHOR</p>
        <TextField
          variant="outlined"
          className="w-full"
          id="author"
          onChange={handleChange}
        />
      </div>
      {/* add category */}
      <div className="my-1">
        <p>CATEGORY</p>
        <TextField
          variant="outlined"
          className="w-full"
          id="category"
          onChange={handleChange}
        />
      </div>
      {/* add tags */}
      <div className="my-1">
        <p>TAGS (comma-separated)</p>
        <TextField
          variant="outlined"
          className="w-full"
          id="tags"
          onChange={handleChange}
        />
      </div>
      {/* button */}
      <div className="flex justify-end">
        <Button variant="contained" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Addarticleinput;
