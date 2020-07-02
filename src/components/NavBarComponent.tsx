import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Button, Hidden, Drawer, ListItem, List, Divider, ListItemText, ListItemIcon, useTheme, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppUser from '../models/AppUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export interface INavProps {
  authUser: AppUser;
}

export default function NavBarComponent(props: any) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key={'Home'} component={Link} to="/" >
          <ListItemIcon></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button key={'Events'} component={Link} to="/events">
          <ListItemIcon></ListItemIcon>
          <ListItemText primary={'Events'} />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  let loggedIn = () => {
    if (props.authUser) {
      return(
        <Button color="inherit" href="/login">Logout</Button>
      )
    }
    else {
      return(
        <Button color="inherit" href="/login">Login</Button>
      )
    }
  }

  return (
    <>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              Time App
          </Typography>
            {loggedIn()}
            {/* <Button color="inherit" href="/login">Login</Button> */}
          </Toolbar>
        </AppBar>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
          >
            {drawer}
          </Drawer>
        </Hidden>

      </div>
    </>
  )
}