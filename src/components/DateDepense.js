import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { updateDate } from "../redux/actions";
import { selectDate } from "../redux/selectors";
import { useSelector, useDispatch } from "react-redux";

export default function DateDepense() {
  const dispatch = useDispatch();
  const [dateChoisie, setDateChoisie] = useState(useSelector(selectDate));

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }
  
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de l'opération"
          format="dd/MM/yyyy"
          value={dateChoisie}
          onChange={(date) => {
            dispatch(updateDate(date));
            setDateChoisie(date);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          okLabel="Valider"
          cancelLabel="Annuler"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
