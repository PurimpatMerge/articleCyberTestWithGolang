import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import Navbar from "../home/Navbar";
import bg from "../../assets/bg-room.jpg";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Editarticlebody = () => {
  const { id } = useParams();
  const { data } = useFetch(`article/getOnlyArticleById/${id}`);
  const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleApply = async() => {
    try{

      console.log(info);
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
        list = [data.results[0].image];
      }
  
      const allInfo = {
        ...info,
        image: list,
      };
      
      await axios.put(`http://localhost:8000/v1/api/article/updateArticle/${data.results[0].id}`,
      allInfo
      );
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }catch(err){
      console.log(err);

    }

  };
  return (
    <>
      <img
        src={bg}
        alt="bg"
        className="absolute h-screen bg-cover w-full -z-10"
      />
      <Navbar />
      <div>
        {data.results && (
          <div className="container mx-auto my-10 bg-white p-5 rounded-sm shadow-xl">
            {/* Header */}
            <div>
              <p className="text-4xl">Edit Article</p>
            </div>
            <Divider />
            {/* Upload Image */}
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
                  />
                  <PhotoCamera />
                </IconButton>
                <label className="text-blue-500">Upload Image</label>
              </div>
              {imageURLs.length > 0 ? (
                <div>
                  {imageURLs.map((imageSrc, index) => (
                    <img key={index} height={400} src={imageSrc} alt="image" />
                  ))}
                </div>
              ) : (
                <img height={400} src={data.results[0].image} alt="image" />
              )}
            </div>
            {/* Display Log Data */}
            {data.results.map((result) => (
              <div key={result.id}>
                <div className="my-1">
                  <p>TITLE</p>
                  <TextField
                  id="title"
                    variant="outlined"
                    className="w-full"
                    defaultValue={result.title}
                    onChange={handleChange}
                  />
                </div>
                <Divider />
                <div className="my-1">
                  <p>CONTENT</p>
                  <TextareaAutosize
                   id="content"
                    className="w-full border py-5 border-gray-200 rounded-md"
                    label="Content"
                    variant="standard"
                    defaultValue={result.content}
                    onChange={handleChange}
                  />
                </div>
                <Divider />
                <div className="my-1">
                  <p>AUTHOR</p>
                  <TextField
                   id="author"
                    variant="outlined"
                    className="w-full"
                    defaultValue={result.author}
                    onChange={handleChange}
                  />
                </div>

                <Divider />
                <div className="my-1">
                  <p>CATEGORY</p>
                  <TextField
                    id="category"
                    variant="outlined"
                    className="w-full"
                    defaultValue={result.category}
                    onChange={handleChange}
                  />
                </div>
                <Divider />
                <div className="my-1">
                  <p>TAGS</p>
                  <TextField
                  id="tags"
                    variant="outlined"
                    className="w-full"
                    defaultValue={result.tags}
                    onChange={handleChange}
                  />
                </div>
                <Divider />
                <div className="my-1">
                  <p>VIEWS COUNT : {result.viewsCount}</p>
                </div>

                <div className="my-1">
                  <p>LIKES COUNT :{result.likesCount}</p>
                </div>
                <div className="my-1">
                  <p>PUBLISHED AT:{result.publishedAt}</p>
                </div>

                <div className="my-1">
                  <p>UPDATED AT:{result.updatedAt}</p>
                </div>
                <Divider />
                {/* Add other fields as needed */}
              </div>
            ))}
            {/* Button */}
            <div className="flex justify-end">
              <Button variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Editarticlebody;
