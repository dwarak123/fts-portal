import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import Avatar from 'react-avatar';
import { Paper, Card, CardContent, CardActions, Button, Grid, Box, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }      
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  profilePic() {
    const currentUser: IUser = AuthService.getCurrentUser();
    if (currentUser.photo) {
      return <img className="profilePhoto" src={`data:image/jpg;base64,${currentUser.photo}`} />
    }
    return <Avatar className="avatar" name={currentUser.username + " " + currentUser.email} size="370" round={false} maxInitials={2} />
  }


  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;


    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <Grid container spacing={0}>
              <Paper variant="outlined" elevation={20} />
              <Paper />
              <Card sx={{ width: 375, height: 390 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <this.profilePic />
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={{ mb: 4, ml: 12.5, color: "white" }}>Upload Profile</Button>
                </CardActions>
              </Card>

              <Card sx={{ width: 715, height: 390, marginLeft: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 20, marginLeft: 2, marginRight: 5 }}>Userid:</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 1 }}>{currentUser.id}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 20, marginLeft: 2, marginRight: 5 }}>Email :</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 1 }}>{currentUser.email}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 20, marginLeft: 2, marginRight: 5 }}>Name   :</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 1 }}>{currentUser.username}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 20, marginLeft: 2, marginRight: 5 }}>Roles :</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 1 }}>{currentUser.roles &&
                      currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </div> : null}
      </div>
    );
  }
}
