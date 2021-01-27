import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";
import * as constantes from "../data/constantes";
import { numberFormat } from "../utils/utils";

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

export const TextFieldMontant = ({ name, register, disabled, onChange }) => {
  const props = (name, disabled) => {
    let conditionnalProperty;
    if (name !== undefined) {
      conditionnalProperty = { name: name };
    }
    if (!disabled) {
      conditionnalProperty = {
        ...conditionnalProperty,
        InputProps: { inputComponent: NumberFormatCustom }
      };
    }
    return conditionnalProperty;
  };

  return (
    <TextField
      {...props(name, disabled)}
      inputRef={register}
      label="Montant"
      disabled={disabled}
      variant="outlined"
      InputLabelProps={{
        shrink: true
      }}
      margin="dense"
      onChange={onChange}
      defaultValue={numberFormat("0")}
    />
  );
};

export const AutocompleteCategorie = ({ name, register }) => {
  const props = (name) => {
    let conditionnalProperty;
    if (name !== undefined) {
      conditionnalProperty = { name: name };
    }
    return conditionnalProperty;
  };

  return (
    <Autocomplete
      {...props(name)}
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
          margin="dense"
        />
      )}
    />
  );
};

export const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

export const LargeurChamps = 4;
