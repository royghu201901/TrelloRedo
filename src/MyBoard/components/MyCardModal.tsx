import React, { useContext, useState } from 'react'
import CardModalContext from './CardModalContext';  // 父孙组件传值
import MyCardComment from './MyCardComment';
import MyListNameModal from './MyListNameModal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WebOutlinedIcon from '@material-ui/icons/WebOutlined';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'auto',
      padding: theme.spacing(5, 0, 10),
    },
    paper: {
      display: 'flex',
      width: 768,
      paddingTop: theme.spacing(5),
      backgroundColor: 'transparent',
    },
    card: {
      width: 768,
      backgroundColor: '#f4f5f7',
      position: 'relative',
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    header: {
      width: '100%',
    },
    main: {
      width: '76%',
    },
    sidebarBox: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    headerImg: {
      width: 768,
      height: 160,
    },
    listName: {
      textDecoration: 'underline',
      marginLeft: theme.spacing(1),
      '&:hover': {
        color: '#172b4d',
      },
      cursor: 'pointer',
    },
    listNameRow: {
      marginLeft: theme.spacing(4.5)
    },
    modalIcon: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1.5),
    },
    mainSpace: {
      margin: theme.spacing(4, 0),
    },
    mainTitle: {
      fontWeight: 600,
    },
    mainText: {
      marginLeft: theme.spacing(0),
    },
    mainCover: {
      width: 112,
      height: 80,
      borderRadius: '3px',
    },
    mainCard: {
      display: 'flex',
      backgroundColor: '#f4f5f7',
      boxShadow: 'none',
      justifyContent: 'flex-start',
      marginLeft: theme.spacing(2.25),
    },
    mainCardText: {
      textAlign: 'left',
      verticalAlign: 'middle',
    },
    mainCardAction: {
      textDecoration: 'underline',
      margin: theme.spacing(0, 1),
      '&:hover': {
        color: '#172b4d',
      },
    },
    addDescBtn: {
      textTransform: 'none',
      backgroundColor: '#091e420a',
      '&:hover': {
        backgroundColor: '#091e4214',
      }
    },
    editDescBtn: {
      textTransform: 'none',
      marginLeft: theme.spacing(1),
    },
    descriptionInputBox: {
      marginLeft: theme.spacing(4.5),
      width: '90%',
    },
    inputSaveBtn: {
      textTransform: 'none',
      marginLeft: theme.spacing(4.5),
    },
    inputCloseBtn: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    modalCloseBtn: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      padding: theme.spacing(1),
      color: '#fff',
      '&:hover': {
        backgroundColor: 'hsla(0,0%,100%,.12)',
      }
    },
    modalCloseBtnOriginal: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      padding: theme.spacing(1),
    },
    deletePopover: {
      marginTop: theme.spacing(1),
    },
    deletePopoverBox: {
      width: theme.spacing(38),
      padding: theme.spacing(1.5),
      position: 'relative'
    },
    deletePopoverTitle: {
      textAlign: 'center',
    },
    deletePopoverDivider: {
      margin: theme.spacing(1.5, 0),
    },
    deletePopoverCloseBtn: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      padding: theme.spacing(1),
    },
    deletePopoverDelBtn: {
      width: '100%',
      marginTop: theme.spacing(2),
      textTransform: 'none',
      color: '#fff',
      backgroundColor: '#b04632',
      '&:hover': {
        backgroundColor: '#933b27',
      },
    },
    siderActionBtn: {
      textTransform: 'none',
      width: theme.spacing(21),
      textAlign: 'left',
      marginBottom: theme.spacing(1),
      justifyContent: 'initial',
      paddingLeft: theme.spacing(2),
    },
  }),
);

interface DeletePopoverProps {
  deletePopoverVisible: HTMLButtonElement | null
  setDeletePopoverVisible: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
}

interface CardContextHeaderProps {
  cardName: string
  listName: string
  cardIndex: number
}

interface CardContextMainProps {
  cardDesc: string
  cardImg: string
}

//* 删除确认弹窗
const DeletePopover = (props: DeletePopoverProps) => {
  const classes = useStyles()
  const { deletePopoverVisible, setDeletePopoverVisible } = props
  const closeDeletePopover = () => {
    setDeletePopoverVisible(null)
  }
  const openDeletePopover = Boolean(deletePopoverVisible)

  const [alertVisible, setAlertVisible] = useState(false)
  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertVisible(false)
  }

  return (
    <Popover
      open={openDeletePopover}
      anchorEl={deletePopoverVisible}
      onClose={closeDeletePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className={classes.deletePopover}
    >
      <Paper className={classes.deletePopoverBox}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.deletePopoverTitle}
        >
          Delete cover?
        </Typography>
        <IconButton
          className={classes.deletePopoverCloseBtn}
          size="small"
          onClick={closeDeletePopover}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Divider className={classes.deletePopoverDivider} />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Deleting an attachment is permanent. There is no undo.
        </Typography>
        <Button
          variant="contained"
          size="small"
          disableElevation
          className={classes.deletePopoverDelBtn}
          onClick={() => setAlertVisible(true)}
        >
          Delete
        </Button>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertVisible}
        autoHideDuration={1500}
        onClose={closeAlert}
      >
        <Alert
          onClose={closeAlert}
          severity="warning"
          elevation={6}
        >
          好不容易找来的封面，你给我删咯？
        </Alert>
      </Snackbar>
    </Popover>
  )
}

//* modal头部
const CardContextHeader = (props: CardContextHeaderProps) => {
  const classes = useStyles()
  const { cardName, listName, cardIndex } = props

  const [listNamePopoverVisible, setListNamePopoverVisible] = useState<HTMLButtonElement | null>(null)
  const showListNamePopoverVisible = (event: React.MouseEvent<HTMLButtonElement>) => {
    setListNamePopoverVisible(event.currentTarget)
  }

  return (
    <Box className={classes.header}>
      <Typography variant="h6" gutterBottom>
        <WebOutlinedIcon className={classes.modalIcon} />
        {cardName}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.listNameRow}
      >
        in list 
        <span
          className={classes.listName}
          onClick={showListNamePopoverVisible}
        >
          {listName}
        </span>
      </Typography>
      <MyListNameModal
        listNamePopoverVisible={listNamePopoverVisible}
        setListNamePopoverVisible={setListNamePopoverVisible}
        listName={listName}
        cardIndex={cardIndex}
      />
    </Box>
  )
}

//* modal主体
const CardContentMain = (props: CardContextMainProps) => {
  const classes = useStyles()
  const { cardDesc, cardImg } = props

  const [descInputVisible, setDescInputVisible] = useState(false)
  const saveDescInput = () => {
    setDescInputVisible(false)
    setAlertVisible(true)
  }

  const [deletePopoverVisible, setDeletePopoverVisible] = useState<HTMLButtonElement | null>(null)
  const showDeletePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDeletePopoverVisible(event.currentTarget)
  }

  const [alertVisible, setAlertVisible] = useState(false)
  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertVisible(false);
  }

  return (
    <Box className={classes.main}>

      {/* Description */}
      <Box className={classes.mainSpace}>
        <Typography
          variant="subtitle1"
          component="p"
          className={classes.mainTitle}
          gutterBottom
        >
          <SubjectOutlinedIcon className={classes.modalIcon} />
          Description
          {cardDesc &&
            <Button
              variant="contained"
              size="small"
              disableElevation
              className={classes.editDescBtn}
              onClick={() => setDescInputVisible(true)}
            >
              Edit
            </Button>
          }
        </Typography>
        {cardDesc && !descInputVisible &&
          <Box
            className={classes.descriptionInputBox}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.mainText}
              gutterBottom
              onClick={() => setDescInputVisible(true)}
            >
              {cardDesc}
            </Typography>
          </Box>
        }
        {!cardDesc && !descInputVisible &&
          <Box
            className={classes.descriptionInputBox}
          >
            <Button
              disableElevation
              className={classes.addDescBtn}
              onClick={() => setDescInputVisible(true)}
            >
              Add a more detailed description...
            </Button>
          </Box>
        }
        {descInputVisible &&
          <>
            <Box className={classes.descriptionInputBox}>
              <TextField
                id="description-input"
                variant="outlined"
                defaultValue={cardDesc}
                multiline
                fullWidth
                size="small"
                margin="dense"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.inputSaveBtn}
              onClick={saveDescInput}
            >
              Save
            </Button>
            <IconButton className={classes.inputCloseBtn}>
              <CloseIcon onClick={() => setDescInputVisible(false)}/>
            </IconButton>
          </>
        }
      </Box>

      {/* 删除后Alert */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertVisible}
        autoHideDuration={1500}
        onClose={closeAlert}
      >
        <Alert
          onClose={closeAlert}
          severity="info"
          elevation={6}
        >
          作为干饭人都自身修养，饭不能不吃！
        </Alert>
      </Snackbar>

      {/* Cover */}
      <Box className={classes.mainSpace}>
        {cardImg &&
          <Typography 
            variant="subtitle1"
            component="p"
            className={classes.mainTitle}
            gutterBottom
          >
            <ImageOutlinedIcon className={classes.modalIcon} />
            Cover
          </Typography>
        }
        {cardImg &&
          <Card className={classes.mainCard}>
            <CardActionArea className={classes.mainCard}>
              <CardMedia
                image={cardImg}
                className={classes.mainCover}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.mainCardText}
                  gutterBottom
                >
                  {cardImg}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.mainCardText}
                  gutterBottom
                >
                  <span>Added Jan 3, 2019 at 6:47 AM</span>
                  <span className={classes.mainCardAction}>Comment</span>
                  <span>-</span>
                  <span
                    className={classes.mainCardAction}
                    onClick={showDeletePopover}
                  >
                    Delete
                  </span>
                  <span>-</span>
                  <span className={classes.mainCardAction}>Edit</span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <DeletePopover
              deletePopoverVisible={deletePopoverVisible}
              setDeletePopoverVisible={setDeletePopoverVisible}
            />
          </Card>
        }
      </Box>

      {/* Activity */}
      <Box className={classes.mainSpace}>
        <Typography 
          variant="subtitle1"
          component="p"
          className={classes.mainTitle}
          gutterBottom
        >
          <ForumOutlinedIcon className={classes.modalIcon} />
          Activity
        </Typography>
        <MyCardComment />
      </Box>
    </Box>
  )
}

//* modal侧边栏
const CardContextSidebar = () => {
  const classes = useStyles()

  const addToCard = [
    {
      key: 'Members',
      text: 'Members',
      icon: <PersonOutlineIcon />,
    },
    {
      key: 'Labels',
      text: 'Labels',
      icon: <BookmarksOutlinedIcon />,
    },
    {
      key: 'Checklist',
      text: 'Checklist',
      icon: <CheckBoxOutlinedIcon />,
    },
    {
      key: 'Dates',
      text: 'Dates',
      icon: <ScheduleOutlinedIcon />,
    },
    {
      key: 'Cover',
      text: 'Cover',
      icon: <ImageOutlinedIcon />,
    },
  ]

  const actions = [
    {
      key: 'Move',
      text: 'Move',
      icon: <ArrowForwardOutlinedIcon />,
    },
    {
      key: 'Copy',
      text: 'Copy',
      icon: <FileCopyOutlinedIcon />,
    },
    {
      key: 'Make template',
      text: 'Make template',
      icon: <PermMediaOutlinedIcon />,
    },
    {
      key: 'Watch',
      text: 'Watch',
      icon: <VisibilityOutlinedIcon />,
    },
    {
      key: 'Archive',
      text: 'Archive',
      icon: <ArchiveOutlinedIcon />,
    },
    {
      key: 'Share',
      text: 'Share',
      icon: <ShareOutlinedIcon />,
    },
  ]

  return (
    <Box>
      <Box className={classes.sidebarBox}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          ADD TO CARD
        </Typography>
        {addToCard.map(action => {
          return (
            <Button
              key={action.key}
              variant="contained"
              size="small"
              disableElevation
              className={classes.siderActionBtn}
              startIcon={action.icon}
            >
              {action.text}
            </Button>
          )
        })}
      </Box>
      <Box className={classes.sidebarBox}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          ACTIONS
        </Typography>
        {actions.map(action => {
          return (
            <Button
              key={action.key}
              variant="contained"
              size="small"
              disableElevation
              className={classes.siderActionBtn}
              startIcon={action.icon}
            >
              {action.text}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default function MyCardModal() {
  const classes = useStyles()
  const {
    cardModalState,
    setCardModal,
    cardDesc,
    cardName,
    cardImg,
    listName,
    cardIndex,
  } = useContext(CardModalContext)

  const cardModalClose = () => {
    setCardModal(false)
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={cardModalState}
        onClose={cardModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={cardModalState}>
          <Paper elevation={0} className={classes.paper}>
            <Card className={classes.card}>
              {cardImg &&
                <CardMedia
                  title={cardName}
                  image={cardImg}
                  className={classes.headerImg}
                />
              }
              <CardContent className={classes.content}>
                <CardContextHeader
                  cardName={cardName}
                  listName={listName}
                  cardIndex={cardIndex}
                />
                <CardContentMain
                  cardDesc={cardDesc}
                  cardImg={cardImg}
                />
                <CardContextSidebar />
              </CardContent>
              <IconButton
                className={cardImg ? classes.modalCloseBtn : classes.modalCloseBtnOriginal}
                onClick={cardModalClose}
              >
                <CloseIcon />
              </IconButton>
            </Card>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
