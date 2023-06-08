import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

const Editarticletable = () => {
  const { data } = useFetch("article/table");
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const navigate = useNavigate();
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

  const filteredData = data && data.results
    ? data.results.filter((row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedData = sortConfig.key
    ? sortData(filteredData, sortConfig.key, sortConfig.direction)
    : filteredData;

  const columns = [
   
    {
      name: "Title",
      accessor: "title",
    },
    {
      name: "Author",
      accessor: "author",
    },
    {
      name: "Category",
      accessor: "category",
    },
    {
      name: "views",
      accessor: "viewsCount",
    },
    {
      name: "likes",
      accessor: "likesCount",
    },
  ];

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/v1/api/article/deleteArticle/${id}`);
     
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              <TableCell>image</TableCell>
              {columns.map((column) => (
                <TableCell key={column.name} onClick={() => handleSort(column)}>
                  {column.name}
                  {sortConfig.key === column.accessor && (
                    <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
    {paginatedData.map((row) => (
      <TableRow className="bg-white" key={row.id}>
          <img src={row.image}style={{ height: "50px",width: "50px" }}/>
        {columns.map((column) => (
          
          <TableCell key={column.name}>
            {row[column.accessor]}
          </TableCell>
        ))}
        <TableCell>
       <Link to={`/editarticlebody/${row.id}`}>   
       <Button variant="text">Edit</Button> 
              </Link>
          <Button variant="text"  onClick={() => handleDelete(row.id)} color="error">Delete</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Editarticletable;
