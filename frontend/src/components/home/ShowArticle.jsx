import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import img from "../../assets/bg-room.jpg";
import axios from "axios";

const ShowArticle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalCount, setTotalCount] = useState(0);


  const { data } = useFetch(
    `article/search?search=${searchQuery || ""}&page=${page || 1}&limit=${
      limit || 8
    }`
  );

  useEffect(() => {
    if (data) {
      setTotalCount(data.countAllViews);
    }
  }, [data]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset page to 1 whenever limit changes
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever searchQuery or limit changes
  }, [searchQuery, limit]);

  //view handler
  const viewAdd = async (id) => {
    try {
      await axios.post(`http://localhost:8000/v1/api/article/addView/${id}`);
      
    } catch (error) {
    console.log(error)
    }
  };
  return (
    <div>
      {/* Search and Add */}
      <div className="container mx-auto">
        <div className="flex">
          <div>
            <TextField
              className=" backdrop-blur-lg bg-white/30"
              placeholder="Search By ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="mx-5 my-auto">
            <Link to="/addarticle">
              <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
                Add
              </Button>
            </Link>
          </div>
          {/* Limit buttons */}
          <Button
            variant="outlined"
            onClick={() => handleLimitChange(8)}
            disabled={limit === 8}
          >
            Show 8 per page
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleLimitChange(12)}
            disabled={limit === 12}
          >
            Show 12 per page
          </Button>
        </div>

        {/* Article content */}
        <div className="mt-10 grid gap-5 grid-cols-none sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(data?.relationData ?? []).map((item) => (
            <div key={item.article?.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.article?.image || img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.article?.title}
                  </Typography>
                  <Typography gutterBottom component="div">
                    author: {item.article?.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.article?.content}
                  </Typography>
                </CardContent>
                <CardContent className="flex">
                  <Avatar alt="avatar" src={item.user?.upicture || img} />
                  <div className="my-auto">
                    <Typography variant="body2" color="text.secondary">
                      {item.user?.fname} {item.user?.lname}
                    </Typography>
                  </div>
                </CardContent>
                <CardContent className="flex justify-between">
                <Typography variant="body2" color="text.secondary">
                     Like {item.article?.likesCount}
                  </Typography>
                <Typography variant="body2" color="text.secondary">
                    view {item.article?.viewsCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.article?.updatedAt
                      ? new Date(item.article.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-center">
                  <Link to={`/ArticleContent/${item.article?.id}`}>
                    <Button size="small" onClick={() => viewAdd(item.article?.id)} >Read More</Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-20">
          {page > 1 && (
            <Button size="small" onClick={handlePreviousPage}>
              Back
            </Button>
          )}

          {page > 3 && (
            <>
              <Button size="small" onClick={() => setPage(1)}>
                1
              </Button>
              <span>...</span>
            </>
          )}

          {page > 2 && (
            <Button size="small" onClick={() => setPage(page - 1)}>
              {page - 1}
            </Button>
          )}

          <Button size="small" disabled>
            {page}
          </Button>

          {page < Math.ceil(data.totalCount / limit) - 1 && (
            <Button size="small" onClick={() => setPage(page + 1)}>
              {page + 1}
            </Button>
          )}

          {page < Math.ceil(data.totalCount / limit) - 2 && (
            <>
              <span>...</span>
              <Button
                size="small"
                onClick={() => setPage(Math.ceil(data.totalCount / limit))}
              >
                {Math.ceil(data.totalCount / limit)}
              </Button>
            </>
          )}

          {page < Math.ceil(data.totalCount / limit) && (
            <Button size="small" onClick={handleNextPage}>
              Next
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ShowArticle;
