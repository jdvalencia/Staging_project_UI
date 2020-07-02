import React, { useEffect, useState, useRef } from 'react';
import { CssBaseline, Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));


export default function RootComponent() {
  
  const classes = useStyles();
    const [time, SetTime] = useState (`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` || undefined);
  function startTime() {
    let hoursArray = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

    let minutesArray = ["o'clock", hoursArray[1], hoursArray[2], hoursArray[3], hoursArray[4], hoursArray[5], hoursArray[6], hoursArray[7],
      hoursArray[8], hoursArray[9], hoursArray[10], hoursArray[11], hoursArray[12], "thirteen", "fourteen", "quarter", "sixteen", "seventeen",
      "eighteen", "nineteen", "twenty", "twenty " + hoursArray[1], "twenty " + hoursArray[2], "twenty " + hoursArray[3], "twenty " + hoursArray[4],
      "twenty " + hoursArray[5], "twenty " + hoursArray[6], "twenty " + hoursArray[7], "twenty " + hoursArray[8], "twenty " + hoursArray[9], "half"];

    let secondsArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
    "eighteen", "nineteen", "twenty", "twenty " + hoursArray[1], "twenty " + hoursArray[2], "twenty " + hoursArray[3], "twenty " + hoursArray[4],
    "twenty " + hoursArray[5], "twenty " + hoursArray[6], "twenty " + hoursArray[7], "twenty " + hoursArray[8], "twenty " + hoursArray[9], 
    "thirty", "thirty " + hoursArray[1], "thirty " + hoursArray[2], "thirty " + hoursArray[3], "thirty " + hoursArray[4],
      "thirty " + hoursArray[5], "thirty " + hoursArray[6], "thirty " + hoursArray[7], "thirty " + hoursArray[8], "thirty " + hoursArray[9], 
      "fourty", "fourty " + hoursArray[1], "fourty " + hoursArray[2], "fourty " + hoursArray[3], "fourty " + hoursArray[4],
      "fourty " + hoursArray[5], "fourty " + hoursArray[6], "fourty " + hoursArray[7], "fourty " + hoursArray[8], "fourty " + hoursArray[9], 
      "fifty",  "fifty " + hoursArray[1], "fifty " + hoursArray[2], "fifty " + hoursArray[3], "fifty " + hoursArray[4],
      "fifty " + hoursArray[5], "fifty " + hoursArray[6], "fifty " + hoursArray[7], "fifty " + hoursArray[8], "fifty " + hoursArray[9]];
    let today = new Date();
    let h;
    let time, hours, minutes;
    if (today.getMinutes() <= 30) {
      if(today.getHours() > 12){
        h = today.getHours() - 12;
      }
      else{
        h = today.getHours();
      }
      hours = hoursArray[h];
      minutes = minutesArray[today.getMinutes()];
      if (today.getMinutes() === 0) {
        time = hours + " " + minutes;
      } else if (today.getMinutes() === 1) {
        time = minutes + " minute past " + hours;
      }
      else if (today.getMinutes() === 15 || today.getMinutes() === 30) {
        time = minutes + " past " + hours;
      }
      else {
        time = minutes + " minutes past " + hours;
      }
    }
    else if (today.getMinutes() > 30) {
      let hoursTo = today.getHours() + 1;
      if (hoursTo === hoursArray.length) {
        hoursTo = 1;
      }
      hours = hoursArray[hoursTo];
      let minutesTo = 60 - today.getMinutes();
      minutes = minutesArray[minutesTo];
      time = minutes + " to " + hours;
    }
    let s = today.getSeconds();
    SetTime(time + " and " + secondsArray[s] + " second(s)");
    let t = setTimeout(startTime, 500);
  }
  const isMounted = useRef(true);
  //@ts-ignore
  useEffect(() => {
    if(isMounted.current){
      startTime();
    }
    return () => isMounted.current = false;
  });

  return(<>
    <CssBaseline />
        <Container maxWidth="md" >
          <div className={classes.toolbar} />
          <Typography variant="h4" style={{ margin: '1em' }}>Current Time:</Typography>
          <Typography variant="h5" style={{ margin: '1em' }}>{time}</Typography>

        </Container>
  </>);
}