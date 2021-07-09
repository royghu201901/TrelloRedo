import React from 'react';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myNav: {
      flexGrow: 1,
      height: theme.spacing(6),
    },
    menuButton: {
      marginRight: theme.spacing(0),
      borderRadius: '3px',
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      margin: '5px',
      padding: '5px 7px',
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    transparentDark: {
      color: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, 0.32)'
    },
    // orange: {
    //   color: theme.palette.getContrastText(deepOrange[500]),
    //   backgroundColor: deepOrange[500],
    // },
    userIcon: {
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
    },
    smallUserIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
      backgroundColor: '#dfe1e6',
    },
    navBtn: {
      borderRadius: '3px',
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      margin: '5px',
      padding: '5px 7px',
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
    },
    renderMenu: {
      marginTop: '32px',
    },
    renderMenuAvatar: {
      paddingLeft: '0',
    },
    renderMenuItem: {
      fontSize: '14px'
    },
    divider: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    appTitleFlex: {
      flexGrow: 1,
    },
    appTitle: {
      opacity: '0.5',
      position: 'absolute',
      left: '50%',
      top: '25%',
      transform: 'translate(-50%, 0)',
      fontWeight: 600,
      fontSize: '20px',
      '&:hover': {
        opacity: '0.75',
      },
    },
  }),
);

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      className={classes.renderMenu}
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // 和 anchorEl={anchorEl} 只需要留一个
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: 'bottom', horizontal: 'right' }} // 和 anchorEl={anchorEl} 只需要留一个
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <List dense>
          <ListItem className={classes.renderMenuAvatar}>
            <ListItemAvatar>
              <Avatar className={classes.userIcon}>GH</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Gang Hu" secondary="royghu201901@hotmail.com" />
          </ListItem>
        </List>
      </MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Profile and visibility</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Activity</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Cards</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Settings</MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Help</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Shortcuts</MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={handleMenuClose}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.myNav}>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar variant="dense" className={classes.transparentDark}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <AppsIcon />
          </IconButton>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.appTitleFlex}>
            <div className={classes.appTitle}>
              Gang Hu's Todo List
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" className={classes.navBtn}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" className={classes.navBtn}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.smallUserIcon}>GH</Avatar>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
