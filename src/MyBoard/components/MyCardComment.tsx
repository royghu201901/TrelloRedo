import { useState } from 'react'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    smallUserIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginTop: theme.spacing(1.5),
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
      backgroundColor: '#dfe1e6',
    },
    commentBox: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(3),
      width: '100%',
    },
    commentAccordion: {
      border: '1px solid rgba(0, 0, 0, .125)',
    },
    commentActionBar: {
      display: 'flex',
    },
    commentActionIcon: {
      padding: theme.spacing(1),
      borderRadius: '4px',
    },
    commentSaveBtn: {
      textTransform: 'none',
    }
  })
)

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      border: '1px solid transparent',
      boxShadow: '0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%)',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    borderRadius: '4px',
  },
  focused: {
    backgroundColor: '#FFF !important',
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
  },
}))(MuiAccordionDetails);

export default function MyCardComment() {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={classes.root}>
      <Avatar className={classes.smallUserIcon}>GH</Avatar>
      <Box className={classes.commentBox}>
        <ClickAwayListener onClickAway={() => setExpanded(false)}>
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(true)}
          >
            <AccordionSummary
              aria-controls="panel-content"
              id="panel-header"
            >
              <InputBase
                id="standard-textarea"
                placeholder="Write a comment..."
                multiline
                fullWidth
                value={inputValue}
                onChange={inputChange}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.commentSaveBtn}
                disableElevation
                disabled={!inputValue}
                onClick={() => setExpanded(false)}
              >
                Save
              </Button>
              <Box className={classes.commentActionBar}>
                <Tooltip
                  title="Insert images..."
                  placement="bottom-start"
                >
                  <IconButton
                    size="small"
                    className={classes.commentActionIcon}
                  >
                    <ImageOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Mention a member..."
                  placement="bottom-start"
                >
                  <IconButton
                    size="small"
                    className={classes.commentActionIcon}
                  >
                    <AlternateEmailOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Add emoji..."
                  placement="bottom-start"
                >
                  <IconButton
                    size="small"
                    className={classes.commentActionIcon}
                  >
                    <SentimentSatisfiedOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </AccordionDetails>
          </Accordion>
        </ClickAwayListener>
      </Box>
    </div>
  )
}
