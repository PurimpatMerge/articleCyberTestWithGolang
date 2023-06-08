import { Link,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout logic, such as clearing the token from local storage
    localStorage.clear();
    navigate('/');
    // Perform any additional logic, such as redirecting to the login page
  };

  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className="py-5">
      <div className="container mx-auto">
        <div className="flex rounded-full p-5 border border-gray-200 shadow-lg backdrop-blur-sm bg-white/30">
          <div className="grow">
            <Button>
              <Link to='/'>Home</Link>
            </Button>
          </div>
          <div className="mx-5">
            <Button
              id="basic-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Admin
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to="/editusers">
                <MenuItem>Edit User</MenuItem>
              </Link>
              <Link to="/editarticle">
                <MenuItem>Edit Article</MenuItem>
              </Link>
            </Menu>
          </div>
          <div>
            {accessToken ? (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button>
                <Link to='/login'>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
