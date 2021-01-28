import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Icon, Typography, Paper } from "@material-ui/core";
import {
  TextFieldMontant,
  AutocompleteCategorie,
  GridContainerProp,
  LargeurChamps
} from "./ComposantsOperation";
import { OperationADecouper } from "./OperationADecouper";
import DateDepense from "./DateDepense";

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
        <Typography variant="h6">Dépense à découper</Typography>

        <Controller
          name={"Date"}
          control={control}
          defaultValue=""
          render={({ onChange, value }) => <DateDepense />}
        />
        <br style={{ fontSize: "0.8em" }} />
        <OperationADecouper register={register} />
        <Typography variant="h6">Découpage</Typography>

        {donnees.map((item, index) => (
          <Grid {...props()} key={item.id} container>
            <Grid item xs={LargeurChamps}>
              <Controller
                control={control}
                name={"Montant_" + index}
                defaultValue={0}
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
                defaultValue=""
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => <AutocompleteCategorie name={name} register={register} />}
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={3}
              xs={2}
            >
              <Grid item xs={3}>
                <Icon
                  color="primary"
                  onClick={() => {
                    append();
                  }}
                >
                  add_circle
                </Icon>
              </Grid>
              <Grid item xs={3}>
                <Icon
                  color="secondary"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  remove_circle
                </Icon>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </form>
    </div>
  );
}
