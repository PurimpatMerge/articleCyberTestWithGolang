import bg from '../../assets/bg-room.jpg';
import Avatar from '@mui/material/Avatar';
import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';

const Articlebody = () => {
  const { id } = useParams();

  const { data } = useFetch(`article/view/${id}`);

  // Check if data is available
  if (!data || !data.relationData || data.relationData.length === 0) {
    return <div>Loading...</div>;
  }

  // Extract the necessary information from the data object
  const {
    user: { fname, lname, updateAt } = {},
    article: { title, content, author, publishedAt, category, tags, image, viewsCount, likesCount } = {},
  } = data.relationData[0] || {};

  // Format the Published At date
  const formattedPublishedAt = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto my-10 bg-white p-5 flex">
      {/* Article */}
      <div className="w-70">
        {/* Header */}
        <div className="my-5 text-center">
          <h1 className="font-bold text-3xl">{title}</h1>
        </div>
        {/* Image */}
        <div className="flex justify-center">
          <img src={image} alt="articlebg" className="h-[600px] bg-cover" />
        </div>
        {/* Content */}
        <div className="mt-10">
          <p>{content}</p>
        </div>
      </div>
      {/* User */}
      <div className="w-30 ml-5">
        {/* Avatar */}
        <div className="flex mb-4">
          <Avatar alt="avatar" src={bg} />
          <div className="my-auto gap-1 mx-1 flex flex-col">
            <p>{fname} {lname}</p>
            <p className="text-yellow-500">{updateAt}</p>
          </div>
        </div>
        {/* User Details */}
        <div>
          <p><strong>Author:</strong> {author}</p>
          <p><strong>Published At:</strong> {formattedPublishedAt}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Tags:</strong> {tags}</p>
          <p><strong>Views:</strong> {viewsCount}</p>
          <p><strong>Likes:</strong> {likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Articlebody;
