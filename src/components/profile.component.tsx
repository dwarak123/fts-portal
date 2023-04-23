import { ChangeEvent, Component, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import Avatar from 'react-avatar';
import { Paper, Card, CardContent, CardActions, Button, Grid, Box, Divider, TextField, Alert, Snackbar, Skeleton } from "@mui/material";
import Typography from '@mui/material/Typography';
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { AxiosResponse } from "axios";

let currentUser: IUser = authService.getCurrentUser();

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  selectedFile: File | undefined,
  fileUploadSuccess: boolean | undefined
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      selectedFile: undefined,
      fileUploadSuccess: undefined
    };
  }

  onFileChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    if ('files' in event.target) {
      this.setState({ selectedFile: event.target.files?.[0] });
    }
  }


  onFileUpload = () => {
    console.log(this.state.selectedFile);
    try {
      userService.upload(this.state.selectedFile, currentUser.email).then((response: AxiosResponse) => {
        if (response.data) {
          currentUser = response.data;
          this.setState({ fileUploadSuccess: true });
        }
      })

    } catch (error) {
      throw new Error("Cannot upload file to database");
    }
  };


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

    const { currentUser, fileUploadSuccess } = this.state;


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
              <Paper variant="outlined" elevation={0} />
              <Paper />
              <Card sx={{ width: 375, height: 450 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <this.profilePic />
                </CardContent>
                <CardActions>
                  <Box sx={{ justifyItems: 'center' }}>
                    <Button variant="contained" component="label" sx={{ width: '45ch', mb: 2, justifySelf: 'center' }} >
                      Upload
                      <input hidden accept="image/*" multiple type="file" onChange={this.onFileChange} />
                    </Button>
                    <Button variant="contained" onClick={this.onFileUpload} sx={{ width: '45ch', }}>Upload foto
                    </Button>
                  </Box>
                </CardActions>
              </Card>

              <Card sx={{ width: 715, height: 450, marginLeft: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 20, marginLeft: 2, marginRight: 5 }}>id      :</Typography>
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
        {fileUploadSuccess && (
          <Alert>File uploaded need to login again to see changes</Alert>
        )}
      </div>
    );
  }
}
