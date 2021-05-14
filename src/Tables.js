import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function colorSupportLevel(supportLevel) {
    switch (supportLevel) {
        case "1":
            console.log();
            return "#CFF18B";
        case "2":
            return "#EBC47A";
        case "3":
            return "#E78B78";
        case "4":
            return "#8E8E8E";
    }
}

const classes = makeStyles({
    table: {
        minWidth: "400",
    },
    middle: {
        backgroundColor: "blue",
    }, tableRow: {
        "&:hover": {
            backgroundColor: '#7EA5FF'
        }
    }
});

class JobsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {jobs: props.jobs, adminMode: true, isDialogAdmin: false, selectedJob: -1, adminPassword: ""};
    }


    getJobs = async () => {
        await fetch("https://apiticketsystem.herokuapp.com/jobs")
            .then((res) => res.json())
            .then((data) => {
                this.setState({jobs: data.jobs.reverse()});
            });
    };

    handleClickOpen = () => {
        this.setState({isDialogAdmin: true});
    };

    handleClose = () => {
        this.setState({isDialogAdmin: false});
    };

    workDone(id) {
        this.setState({
            selectedJob: id
        }, function () {
            console.log(this.state.selectedJob)
            this.handleClickOpen();
        });
    }

    jobDone = async () => {
        console.log(this.state.adminPassword);
        let data = {
            id: this.state.selectedJob,
            adminPassword: this.state.adminPassword
        }
        console.log(data.id);
        console.log(data.adminPassword);
        await fetch("https://apiticketsystem.herokuapp.com/jobDone", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"},
        }).then(response => response.json())
            .then(answer => {
                if (answer.failure) {
                    alert("Das Password war falsch!");
                } else {
                    fetch("https://apiticketsystem.herokuapp.com/jobs")
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({jobs: data.jobs.reverse()});
                        });
                }
            });

        this.setState({openForm: true});
        await this.getJobs;
        console.log(this.state.jobs);
        this.handleClose();
    }

    render() {

        return (
            <div>
                <div style={{margin: "2vh"}}>
                    <span style={{
                        width: "200px",
                        height: "15px",
                        backgroundColor: "#CFF18B",
                        marginRight: "10px",
                        padding: "5px"
                    }}>Niedrig</span>
                    <span style={{
                        width: "200px",
                        height: "15px",
                        backgroundColor: "#EBC47A",
                        marginRight: "10px",
                        padding: "5px"
                    }}>Mittel</span>
                    <span style={{
                        width: "200px",
                        height: "15px",
                        backgroundColor: "#E78B78",
                        marginRight: "10px",
                        padding: "5px"
                    }}>Hoch</span>
                    <span style={{
                        width: "200px",
                        height: "15px",
                        backgroundColor: "#8E8E8E",
                        marginRight: "10px",
                        padding: "5px"
                    }}>Erledigt</span>

                    <FormControlLabel
                        style={{color: "white"}}
                        control={<Switch checked={!this.state.adminMode} onChange={() => {
                            this.setState({adminMode: !this.state.adminMode})
                        }} name="checkedA"/>}
                        label="AdminMode aktivieren"
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Done</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Raum</TableCell>
                                <TableCell align="right">Beschreibung</TableCell>
                                <TableCell align="right">Datum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.jobs.map((row) => (
                                <TableRow
                                    key={row.id}
                                    style={{
                                        backgroundColor: colorSupportLevel(row.supportLevel)
                                    }}
                                    hover
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            inputProps={{'aria-label': 'select all desserts'}}
                                            checked={row.supportLevel == 4}
                                            disabled={this.state.adminMode}
                                            onClick={() => {
                                                this.workDone(row.id)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell style={{width: "5%"}} align="right">
                                        {row.id}
                                    </TableCell>
                                    <TableCell style={{width: "20%"}} align="right">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{width: "5%"}} align="right">
                                        {row.room}
                                    </TableCell>
                                    <TableCell style={{width: "45%"}} align="right">
                                        {row.description}
                                    </TableCell>
                                    <TableCell style={{width: "20%"}} align="right">
                                        {row.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.isDialogAdmin} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Bestätigen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Zur Bestätigung bitte Admin-Passwort eingeben:
                        </DialogContentText>
                        <TextField
                            fullWidth
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            size="small"
                            autoComplete="current-password"
                            variant="filled"
                            value={this.state.adminPassword}
                            onChange={(event) => {
                                this.setState({adminPassword: event.target.value});
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={this.jobDone} color="primary">
                            Bestätigen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default JobsTable;


