import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import IUser from "../types/user.type";
import EventBus from "../common/EventBus";
const user: IUser = authService.getCurrentUser();

type Props = {};

type State = {
  showModeratorBoard: boolean | undefined;
  showAdminBoard: boolean | undefined;
  currentUser: IUser | undefined;
  hour: number;
  anchorElNav: any;
  setAnchorElNav: any;
  anchorElUser: any;
  setAnchorElUser: any;
};

class ResponsiveAppBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      hour: 0,
      anchorElNav: null,
      setAnchorElNav: null,
      anchorElUser: null,
      setAnchorElUser: null,
    };
  }

  getHour() {
    const hour = new Date().getHours();
    this.setState({
      hour,
    });
  }

  componentDidMount() {
    const user: IUser = authService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles?.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles?.includes("ROLE_ADMIN"),
      });
    }
    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    authService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      anchorElNav: null,
      setAnchorElNav: null,
      anchorElUser: null,
      setAnchorElUser: null,
    });
    window.location.reload();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, hour } =
      this.state;

    const { anchorElNav, setAnchorElNav } = this.state;
    const open = Boolean(anchorElNav);

    const { anchorElUser, setAnchorElUser } = this.state;
    const openUser = Boolean(anchorElUser);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(anchorElNav ? null : event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Financial Transaction System
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FTS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={Link}
                to="/"
                variant="text"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>

              { currentUser ? (<Button
                variant="text"
                component={Link}
                to="/profile"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, ml: 2, color: "white", display: "block" }}
              >
                Profile
              </Button>
              ): null}

                { currentUser ? (<Button
                variant="text"
                component={Link}
                to="/mod"
                onClick={handleCloseNavMenu}
                sx={{  my: 2, ml: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
              ): null}

              {showAdminBoard && (
                <Button
                  component={Link}
                  to="/admin"
                  variant="text"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml: 2, color: "white", display: "block" }}
                >
                  Admin
                </Button>
              )}
              {showModeratorBoard ||
                (showAdminBoard && (
                  <Button
                    component={Link}
                    to="/mod"
                    variant="text"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, ml: 2, color: "white", display: "block" }}
                  >
                    Mod
                  </Button>
                ))}
              { currentUser ? (<Button
                component={Link}
                to="/user"
                variant="text"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, ml: 2, color: "white", display: "block" }}
              >
                User
              </Button>
              ): null}

            </Box>
            {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {currentUser.photo && (
                      <img
                        className="bannerPhoto"
                        alt=""
                        src={`data:image/jpg;base64,${user.photo}`}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  ml: 50,
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Button
                  component={Link}
                  to="/login"
                  variant="text"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="text"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              </Box>
            )}
            {currentUser ? (
              <Button
                variant="text"
                onClick={this.logOut}
                sx={{ my: 2, ml: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default ResponsiveAppBar;
