import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  text: {
    color: "white",
  },
}));

export default function Form(props) {
  let name, room, description, level;

  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} autoComplete="off">
        <div>
          <TextField
            id="filled-name"
            label="Name"
            value={name}
            className={classes.text}
           
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-name"
            label="Raum/Ort"
            value={room}
            className={classes.text}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-name"
            label="Beschreibung"
            value={description}
            className={classes.text}
            variant="filled"
          />
        </div>
        <div>
          <NativeSelect value={level}>
            <option value="low">Kann mal warten</option>
            <option value="middle">Bald mal</option>
            <option value="high">HIIIILFE! (Dringend)</option>
          </NativeSelect>
        </div>
        <Button variant="outlined" color="secondary">
          Ticket hinterlegen
        </Button>
      </form>
    </div>
  );
}
