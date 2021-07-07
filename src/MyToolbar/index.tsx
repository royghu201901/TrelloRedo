import React, { useState } from 'react';
import { fade, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbarButton: {
      marginRight: theme.spacing(2),
      backgroundColor: fade(theme.palette.common.black, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.15),
      },
      textTransform: 'none'
    },
    toolbarRightButton: {
      marginRight: theme.spacing(0),
      backgroundColor: fade(theme.palette.common.black, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.15),
      },
      textTransform: 'none',
    },
    toolbarButtonIcon: {
      color: fade(theme.palette.common.black, 0.5),
      marginLeft: theme.spacing(0.5),
    },
    groupBar: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
    groupName: {
      fontWeight: 600,
    },
    starBtn: {
      backgroundColor: fade(theme.palette.common.black, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.15),
      },
      borderRadius: '3px',
      padding: '4px',
      margin: '0 15px'
    },
    starBtnActive: {
      color: '#f2d600',
    },
    starBtnUnactive: {
      color: fade(theme.palette.common.black, 0.5),
    },
    transparentLight: {
      color: '#172B4D',
      backgroundColor: 'transparent',
    },
    verticalDivider: {
      margin: theme.spacing(0.75, 2, 0.75, 0),
    },
    workspaceChip: {
      backgroundColor: fade(theme.palette.common.black, 0.1),
      margin: theme.spacing(0, 0.5),
    },
    smallUserIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
      backgroundColor: '#dfe1e6',
      cursor: 'pointer',
    },
    leaderTagBox: {
      position: 'relative',
    },
    leaderTag: {
      position: 'absolute',
      width: '9px',
      height: '9px',
      bottom: '-2px',
      right: '6px'
    },
    starTipWidth: {
      maxWidth: 170,
    },
    leaderLogoTipWidth: {
      maxWidth: 150,
    }
  }),
);

const starTip = `Click to star or unstar this board. Starred boards show up at the top if your boards list.`;
const leaderLogoTip = `This member is an admin of this board.`

export default function ButtonAppBar() {
  const classes = useStyles();

  // 设置star
  const [star, setStar] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.transparentLight}>
          <Button
            className={classes.toolbarButton}
            size="small"
            startIcon={<GraphicEqIcon className={classes.toolbarButtonIcon} />}
            endIcon={<ExpandMoreIcon className={classes.toolbarButtonIcon} />}
          >
            Board
          </Button>
          <Box className={classes.groupBar}>
            <Typography variant="h6" className={classes.groupName}>
              HuiMeng Tec
            </Typography>
            <Tooltip
              title={starTip}
              placement="bottom-start"
              classes={{ tooltip: classes.starTipWidth }}
            >
              <IconButton
                aria-label="Click to star or unstar this board"
                className={classes.starBtn}
                onClick={() => setStar(!star)}
              >
                <StarBorderIcon className={star ? classes.starBtnActive : classes.starBtnUnactive} />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem className={classes.verticalDivider} />
            <Button
              className={classes.toolbarButton}
              size="small"
              color="inherit"
            >
              Gang Hu's Workspace
              <Chip size="small" label="Free" className={classes.workspaceChip} />
            </Button>
            <Divider orientation="vertical" flexItem className={classes.verticalDivider} />
            <Button
              className={classes.toolbarButton}
              size="small"
              color="inherit"
              startIcon={<GroupIcon className={classes.toolbarButtonIcon} />}
            >
              Workspace visible
            </Button>
            <Divider orientation="vertical" flexItem className={classes.verticalDivider} />
            <Tooltip
              title={leaderLogoTip}
              placement="bottom-start"
              classes={{ tooltip: classes.leaderLogoTipWidth }}
            >
              <Box className={classes.leaderTagBox}>
                <Avatar className={classes.smallUserIcon}>GH</Avatar>
                <img
                  src="https://a.trellocdn.com/prgb/dist/images/chevron.88a4454280d68a816b89.png"
                  alt="leader"
                  className={classes.leaderTag}
                  draggable="false"
                />
              </Box>
            </Tooltip>
            <Button
              className={classes.toolbarButton}
              size="small"
              color="inherit"
            >
              Invite
            </Button>
          </Box>
          <Button
            className={classes.toolbarButton}
            size="small"
            color="inherit"
            startIcon={<FlashOnIcon className={classes.toolbarButtonIcon} />}
          >
            Automation
          </Button>
          <Button
            className={classes.toolbarRightButton}
            size="small"
            color="inherit"
            startIcon={<MoreHorizIcon className={classes.toolbarButtonIcon} />}
          >
            Show menu
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
