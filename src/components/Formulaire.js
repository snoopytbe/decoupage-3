import React from "react";
import { useForm } from "react-hook-form";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";
import * as constantes from "../data/constantes";

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important" // override inline-style
    }
  }
})(TextField);

const autoCompleteStyle = makeStyles((theme) => ({
  inputRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
      borderWidth: 2
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red"
    }
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator={" "}
      defaultValue="0"
      decimalScale="2"
      allowEmptyFormatting
      fixedDecimalScale
      isNumericString
      suffix="€"
    />
  );
}
export default function Formulaire() {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = autoCompleteStyle();

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" justify="center" spacing={3}>
          <Grid item xs={4}>
            <ValidationTextField
              inputRef={register}
              name="montant"
              label="Montant"
              disabled
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              classes={classes}
              id="combo-box-demo"
              options={constantes.data}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  inputRef={register({ required: true })}
                  required
                  name="categorie"
                  label="Catégorie"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" spacing={3}>
          <Grid item xs={4}>
            <ValidationTextField
              inputRef={register}
              variant="outlined"
              name="montant2"
              label="Montant"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              fullWidth
              onChange={(e) => setValue("montant", 10 - e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              id="combo-box-demo2"
              options={constantes.data}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  inputRef={register}
                  name="categorie2"
                  label="Catégorie"
                />
              )}
            />
          </Grid>
        </Grid>
        <input type="submit" />
      </form>
    </div>
  );
}
