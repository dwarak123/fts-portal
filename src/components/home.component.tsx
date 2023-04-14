import { Component } from "react";
import { AxiosError } from "axios";
import UserService from "../services/user.service";
import '../App.css';

type Props = {};

type State = {
  content: [];
  error: AxiosError;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: [],
      error: new AxiosError
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        console.log(response.data);
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          error:
            (error.response && error.response.data) ||
            error.response.data.message
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          
            
        </header>
      </div>
    );
  }
}
