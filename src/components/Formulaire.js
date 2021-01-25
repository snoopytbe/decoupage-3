import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField, Typography, Grid, IconButton} from '@material-ui/core';
import {Icon} from '@material-ui/icons';
import NumberFormat from "react-number-format";
import * as constantes from "../data/constantes";

const numberFormat = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);

const TextFieldMontant = ({
  name,
  control,
  register,
  disabled,
  onChangeHandler
}) => {
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
  const [data, setData] = useState([
    { Montant: "1000", Categorie: "Habillement, accessoires" }
  ]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm();
  const onSubmit = (data) => console.log(parseFloat(data.Montant_1));

  const append = () => {
    setData([...data, { Montant: "0", Categorie: "Dépenses vie courante" }]);
  };

  const remove = (index) => {
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridOperation numero={98} register={register} disabled={true} />
        <GridOperation
          numero={99}
          register={register}
          onChangeHandler={(e) => {
            setValue("Montant_98", numberFormat(10 - e.target.value));
            //setValue("Montant_2", numberFormat(e.target.value));
          }}
        />
        {data.map((item, index) => (
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item xs={3}>
            <Typography>Dépense à découper</Typography>
            </Grid>
            <Grid item xs>
              <Controller
                control={control}
                name={"Montant_" + index}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
                  <TextField
                    inputRef={register}
                    label="Montant"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ inputComponent: NumberFormatCustom }}
                    onChange={(e) => {
                      setValue("Montant_0", numberFormat(10 - e.target.value));
                    }}
                    fullWidth
                    defaultValue={item.Montant}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Controller
                name={"Categorie_" + index}
                control={control}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
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
                        defaultValue={item.Categorie}
                        label="Catégorie"
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              <span
                role="img"
                aria-label="action"
                onClick={() =>
                  index < data.length - 1 ? remove(index) : append()
                }
                style={{ cursor: "pointer" }}
              >
                {index < data.length - 1 ? "✖" : "➕"}
              </span>
            </Grid>
            <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
            <Grid item xs={1}>
              <span
                role="img"
                aria-label="action"
                onClick={() => index === data.length - 1 && remove(index)}
                style={{ cursor: "pointer" }}
              >
                {index === data.length - 1 && "✖"}
              </span>
            </Grid>
          </Grid>
        ))}

        <input type="submit" />
      </form>
    </div>
  );
}
