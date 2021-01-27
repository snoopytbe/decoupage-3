import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Icon, TextField } from "@material-ui/core";
import {
  TextFieldMontant,
  AutocompleteCategorie,
  GridContainerProp,
  LargeurChamps
} from "./ComposantsOperation";

export default function Decoupage() {
  const [donnees, setData] = useState([
    { Montant: 0, Categorie: "" },
    { Montant: 0, Categorie: "" }
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
    setData([...donnees, { Montant: "0", Categorie: "" }]);
  };

  const remove = (index) => {
    setData([...donnees.slice(0, index), ...donnees.slice(index + 1)]);
  };

  const props = () => {
    return GridContainerProp;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {donnees.map((/*item,*/ index) => (
          <Grid {...props()} key={index} container>
            <Grid item xs={LargeurChamps}>
              <Controller
                control={control}
                name={"Montant_" + index}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => <TextFieldMontant name={name} register={register} />}
              />
            </Grid>
            <Grid item xs={LargeurChamps}>
              <Controller
                name={"Categorie_" + index}
                control={control}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => <AutocompleteCategorie name={name} register={register} />}
              />
            </Grid>
            <Grid item container xs={2}>
              {/*               <Grid item xs={3}>
                  <Icon color="primary">add_circle</Icon>
              </Grid> */}
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
        ))}
        <button onClick={remove(index)}>
          <Icon color="secondary">remove_circle</Icon>
        </button>
      </form>
    </div>
  );
}
