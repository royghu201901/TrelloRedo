import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listNamePopover: {
      marginTop: theme.spacing(1),
    },
    listNamePopoverBox: {
      width: theme.spacing(35),
      padding: theme.spacing(1.5),
      position: 'relative'
    },
    listNamePopoverTitle: {
      textAlign: 'center',
    },
    listNamePopoverDivider: {
      margin: theme.spacing(1.5, 0),
    },
    listNamePopoverCloseBtn: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      padding: theme.spacing(1),
    },
    listNamePopoverDelBtn: {
      marginTop: theme.spacing(2),
      textTransform: 'none',
      color: '#fff',
    },
    listNameActionArea: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    listNameActionForBoard: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '100%',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0.75, 1.5),
      backgroundColor: 'rgba(9,30,66,.04)',
      borderRadius: '3px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(9,30,66,.08)',
      }
    },
    listNameActionForList: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      flex: 3,
      marginRight: theme.spacing(1),
      padding: theme.spacing(0.75, 1.5),
      backgroundColor: 'rgba(9,30,66,.04)',
      borderRadius: '3px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(9,30,66,.08)',
      }
    },
    listNameActionForPosition: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      flex: 1,
      padding: theme.spacing(0.75, 1.5),
      backgroundColor: 'rgba(9,30,66,.04)',
      borderRadius: '3px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(9,30,66,.08)',
      }
    },
    cardMenu: {
      marginLeft: theme.spacing(10)
    }
  }),
);

const listOptions = [
  'Todo',
  'Doing',
  'Done',
]

const positionOptions = [
  1,
  2,
  3,
  4,
  5,
  6,
]

interface ListNamePopoverProps {
  listNamePopoverVisible: HTMLButtonElement | null
  setListNamePopoverVisible: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  listName: string
  cardIndex: number
}

//* 点击listName快捷功能弹窗
const MyListNameModal = (props: ListNamePopoverProps) => {
  const classes = useStyles()
  const { listNamePopoverVisible, setListNamePopoverVisible, listName, cardIndex } = props
  const closePopover = () => {
    setListNamePopoverVisible(null)
  }
  const openListNamePopover = Boolean(listNamePopoverVisible)

  //* selectedListName初始值
  const [selectedListName, setSelectedListName] = React.useState(listName)

  //* 定位listName选择框
  const [listNameAnchorEl, setListNameAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedListNameIndex, setSelectedListNameIndex] = React.useState(0)

  //* 打开listName选项
  const openListNameOptions = (event: React.MouseEvent<HTMLElement>) => {
    setListNameAnchorEl(event.currentTarget)
  }
  const selectListNameOption = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedListNameIndex(index)
    setSelectedListName(listOptions[index])
    setListNameAnchorEl(null)
  }

  //* selectedPosition初始值
  const [selectedPosition, setSelectedPosition] = React.useState(cardIndex)

  //* 定位position选择框
  const [positionAnchorEl, setPositionAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedPositionIndex, setSelectedPositionIndex] = React.useState(0)

  //* 打开position选项
  const openPositionOptions = (event: React.MouseEvent<HTMLElement>) => {
    setPositionAnchorEl(event.currentTarget)
  }
  const selectPositionOption = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedPositionIndex(index)
    setSelectedPosition(positionOptions[index])
    setPositionAnchorEl(null)
  }

  //* 关闭选择框
  const handleClose = () => {
    setListNameAnchorEl(null)
    setPositionAnchorEl(null)
  }

  return (
    <Popover
      open={openListNamePopover}
      anchorEl={listNamePopoverVisible}
      onClose={closePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className={classes.listNamePopover}
    >
      <Paper className={classes.listNamePopoverBox}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.listNamePopoverTitle}
        >
          Move card
        </Typography>
        <IconButton
          className={classes.listNamePopoverCloseBtn}
          size="small"
          onClick={closePopover}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Divider className={classes.listNamePopoverDivider} />
        <Typography
          variant="overline"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Select destination
        </Typography>
        {/* 此处的按钮其实可以用List来做 */}
        <Box className={classes.listNameActionArea}>
          <Box
            className={classes.listNameActionForBoard}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              component="p"
            >
              Board
            </Typography>
            <Typography
              variant="body2"
              component="p"
            >
              HuiMeng Tec
            </Typography>
          </Box>
          <Box
            className={classes.listNameActionForList}
            onClick={openListNameOptions}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              component="p"
            >
              List
            </Typography>
            <Typography
              variant="body2"
              component="p"
            >
              {selectedListName}
            </Typography>
          </Box>
          <Box
            className={classes.listNameActionForPosition}
            onClick={openPositionOptions}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              component="p"
            >
              Position
            </Typography>
            <Typography
              variant="body2"
              component="p"
            >
              {selectedPosition}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disableElevation
          fullWidth
          className={classes.listNamePopoverDelBtn}
          onClick={closePopover}
        >
          Move
        </Button>

        {/* list选择框 */}
        <Menu
          id="list-menu"
          className={classes.cardMenu}
          anchorEl={listNameAnchorEl}
          keepMounted
          open={Boolean(listNameAnchorEl)}
          onClose={handleClose}
        >
          {listOptions.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedListNameIndex}
              onClick={(event) => selectListNameOption(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* position选择框 */}
        <Menu
          id="position-menu"
          className={classes.cardMenu}
          anchorEl={positionAnchorEl}
          keepMounted
          open={Boolean(positionAnchorEl)}
          onClose={handleClose}
        >
          {positionOptions.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedPositionIndex}
              onClick={(event) => selectPositionOption(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    </Popover>
  )
}

export default MyListNameModal