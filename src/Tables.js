import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function colorSupportLevel(supportLevel) {
  console.log(supportLevel);
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
  },
});

class JobsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jobs: props.jobs };
  }

  render() {
    return (
      <div>
        <div style={{margin: "2vh"}}>
        <span style={{width: "200px",height: "15px", backgroundColor: "#CFF18B",marginRight: "10px", padding: "5px"}}>Niedrig</span>
        <span style={{width: "200px",height: "15px", backgroundColor: "#EBC47A",marginRight: "10px", padding: "5px"}}>Mittel</span> 
        <span style={{width: "200px",height: "15px", backgroundColor: "#E78B78",marginRight: "10px", padding: "5px"}}>Hoch</span>
        <span style={{width: "200px",height: "15px", backgroundColor: "#8E8E8E",marginRight: "10px", padding: "5px"}}>Erledigt</span>
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
                    backgroundColor: colorSupportLevel(row.supportLevel),
                  }}
                  className={classes.something}
                >
                  <TableCell style={{ width: "5%" }} align="right">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="right">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: "5%" }} align="right">
                    {row.room}
                  </TableCell>
                  <TableCell style={{ width: "45%" }} align="right">
                    {row.description}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="right">
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default JobsTable;
