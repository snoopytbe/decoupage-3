import React from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import {
  TextFieldMontant,
  AutocompleteCategorie,
  GridContainerProp,
  LargeurChamps
} from "./ComposantsOperation";

export default function Formulaire() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm();

  const onSubmit = () => {};

  const props = () => {
    return GridContainerProp;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid {...props()} container>
          <Grid item xs={LargeurChamps}>
            <TextFieldMontant name={"Montant"} register={register} />
          </Grid>
          <Grid item xs={LargeurChamps}>
            <AutocompleteCategorie name={"Categorie"} register={register} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
