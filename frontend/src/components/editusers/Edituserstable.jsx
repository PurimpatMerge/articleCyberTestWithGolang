import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import useFetch from "../../hooks/useFetch";

const Edituserstable = () => {
  const { data } = useFetch("users/");
  console.log(data);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState('');

  useEffect(() => {
    if (images?.length < 1) return;
    const newImageUrls = [];
    images?.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const columns = [
    {
      name: 'Name',
      accessor: 'fname',
    },
    {
      name: 'Lastname',
      accessor: 'lname',
    },
    {
      name: 'Email',
      accessor: 'uemail',
    },
    {
      name: 'username',
      accessor: 'username',
    },
    
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortConfig.key === column.accessor) {
      setSortConfig({
        key: column.accessor,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: column.accessor, direction: "asc" });
    }
  };

  const sortData = (data, key, direction) => {
    return data.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData = data
    ? data.filter(
        (row) =>
          row.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.uemail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedData = sortConfig.key
    ? sortData(filteredData, sortConfig.key, sortConfig.direction)
    : filteredData;

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (images?.length < 1) return;
    const newImageUrls = [];
    images?.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  return (
    <div className="container mx-auto my-5">
        <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TableContainer>

        <Table>
          <TableHead>
            <TableRow className="bg-gray-500">
              {columns.map((column) => (
                <TableCell
                  key={column.name}
                  onClick={() => handleSort(column)}
                >
                  {column.name}
                  {sortConfig.key === column.accessor && (
                    <span>
                      {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
       
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow className="bg-white" key={row.userid}>
                {columns.map((column) => (
                  <TableCell key={column.name}>{row[column.accessor]}</TableCell>
                ))}
                {/* <TableCell>
                  <Button onClick={handleOpen} variant="text">
                    Edit
                  </Button>
                  <Button variant="text">Delete</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Edit content */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-5 bg-white w-1/2 inset-x-1/2 -translate-x-1/2 top-28 absolute ">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onImageChange} />
                <PhotoCamera />
              </IconButton>
              <label className=" text-blue-500">Upload Image</label>
              {imageURLs.map((imageSrc, index) => (
                <img key={index} height={100} src={imageSrc} alt="profileimg" />
              ))}
            </div>
            <div></div>
            <div>
              <TextField label="Username" variant="standard" />
            </div>
            <div>
              <TextField label="Password" variant="standard" />
            </div>
            <div>
              <TextField label="Firstname" variant="standard" />
            </div>
            <div>
              <TextField label="Lastname" variant="standard" />
            </div>
            <div>
              <TextField label="Email" variant="standard" />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button variant="contained">Apply</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Edituserstable;