import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import JobsTable from "./Tables";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    openForm: false,
    jobs: {},
    id: -1,
    name: "",
    room: "",
    description: "",
    supportLevel: -1,
  };

  getJobs = () => {
    fetch("https://apiticketsystem.herokuapp.com/jobs")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ jobs: data.jobs.reverse() });
      });
  };

  componentWillMount() {
    this.getJobs();
  }

  switchToForm = () => {
    this.setState({ openForm: !this.state.openForm });
    this.getJobs();
  };

  addNewJob = () => {
    console.log(this.state.level);
    let data = {
      id: 1,
      name: this.state.name,
      room: this.state.room,
      description: this.state.description,
      supportLevel: this.state.supportLevel,
      done: false,
    };
    fetch("https://apiticketsystem.herokuapp.com/addJob", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => alert("Versendet"));
  };

  render() {
    return (
      <div className="App">
        <div class="container">
          <Button
            variant="contained"
            color="primary"
            onClick={this.switchToForm}
          >
            {this.state.openForm ? "Neues Ticket anlegen" : "Aktuelle Tickets"}
          </Button>
          {this.state.openForm ? (
            <JobsTable jobs={this.state.jobs} />
          ) : (
            <div class="formular">
              <form>
                <div class="input">
                  <TextField
                    fullWidth
                    id="filled-name"
                    label="Name"
                    value={this.state.name}
                    onChange={(event) => {
                      this.setState({ name: event.target.value });
                    }}
                    variant="filled"
                  />
                </div>
                <div class="input">
                  <TextField
                    id="filled-room"
                    label="Raum/Ort"
                    fullWidth
                    value={this.state.room}
                    onChange={(event) => {
                      this.setState({ room: event.target.value });
                    }}
                    variant="filled"
                  />
                </div>
                <div class="input">
                  <TextField
                    multiline
                    fullWidth
                    id="filled-description"
                    label="Beschreibung"
                    onChange={(event) => {
                      this.setState({ description: event.target.value });
                    }}
                    value={this.state.description}
                    variant="filled"
                    rows={4}
                  />
                </div>
                <div class="input">
                  <NativeSelect
                    fullWidth
                    value={this.state.supportLevel}
                    onChange={(event) => {
                      this.setState({ supportLevel: event.target.value });
                    }}
                  >
                    <option value={1}>Kann mal warten</option>
                    <option value={2}>Bald mal</option>
                    <option value={3}>HIIIILFE! (Dringend)</option>
                  </NativeSelect>
                </div>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.addNewJob}
                >
                  Ticket hinterlegen
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
