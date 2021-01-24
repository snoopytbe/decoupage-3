import React from "react";
import { useForm } from "react-hook-form";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";
import * as constantes from "../data/constantes";

const numberFormat = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);

const TextFieldMontant = ({ name, register, disabled, onChangeHandler }) => {
  const props = (disabled) => {
    let conditionnalProperty = {};
    !disabled &&
      (conditionnalProperty = {
        InputProps: { inputComponent: NumberFormatCustom }
      });
    return conditionnalProperty;
  };

  return (
    <TextField
      {...props(disabled)}
      inputRef={register}
      name={name}
      label="Montant"
      disabled={disabled}
      variant="outlined"
      InputLabelProps={{
        shrink: true
      }}
      onChange={onChangeHandler}
      fullWidth
    />
  );
};

const AutocompleteCategorie = ({ name, register }) => {
  return (
    <Autocomplete
      id="autocomplete"
      options={constantes.data}
      getOptionLabel={(option) => option.label}
      fullWidth
      required
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          inputRef={register({ required: true })}
          required
          name={name}
          label="Catégorie"
        />
      )}
    />
  );
};

const GridOperation = ({ numero, register, disabled, onChangeHandler }) => {
  return (
    <Grid container direction="row" justify="center" spacing={3}>
      <Grid item xs={3}>
        Dépense à découper
      </Grid>
      <Grid item xs={4}>
        <TextFieldMontant
          name={"Montant_" + numero}
          register={register}
          disabled={disabled}
          onChangeHandler={onChangeHandler}
        />
      </Grid>
      <Grid item xs={4}>
        <AutocompleteCategorie
          name={"Categorie_" + numero}
          register={register}
        />
      </Grid>
    </Grid>
  );
};

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
      fixedDecimalScale
      isNumericString={false}
      suffix="€"
    />
  );
}
export default function Formulaire() {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = (data) => console.log(parseFloat(data.Montant_1));

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridOperation numero={1} register={register} disabled={true} />
        <GridOperation
          numero={2}
          register={register}
          onChangeHandler={(e) => {
            setValue("Montant_1", numberFormat(10 - e.target.value));
            //setValue("Montant_2", numberFormat(e.target.value));
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
