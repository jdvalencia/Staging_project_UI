import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Grid, FormControl } from '@material-ui/core';

export default function RegisterComponent() {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-26T21:11:54'));

    const handleDateChange = (date: any) => {
      setSelectedDate(date);
      console.log(date.getHours() + ":" + date.getMinutes());
    };
    return(
        <>
        <FormControl>
            <form>
            
            </form>
        </FormControl>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
        </>
    )
}