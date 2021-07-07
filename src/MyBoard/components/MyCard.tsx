import { useContext } from 'react'
import CardModalContext from './CardModalContext'; // 父子组件传值
import MyCardModal from './MyCardModal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
    },
    cardTitle: {
      padding: theme.spacing(1, 2, 0)
    },
    actionBar: {
      paddingTop: 0
    },
    action: {
      display: 'flex',
      flexGrow: 1,
    },
    actionBtn: {
      padding: theme.spacing(0, 0.5),
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'inherit',
      }
    },
    dragTipWidth: {
      maxWidth: 150,
    }
  })
)

const dragTip = 'Hold the action bar to drag.'

export default function MyCard() {
  const classes = useStyles();

  const { cardName, cardImg, cardDesc, listName, cardIndex, cardModalState, setCardModal } = useContext(CardModalContext)
  // const [cardModalState, setCardModal] = useState(false)

  const cardModalOpen = () => {
    setCardModal(true)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardModalOpen}>
        {cardImg && 
          <CardMedia
            className={classes.media}
            image={cardImg}
            title={cardName}
          />
        }
        <CardContent className={classes.cardTitle}>
          <Typography gutterBottom variant="subtitle2">
            {cardName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionBar}>
        <div className={classes.action}>
          {cardImg && 
            <IconButton className={classes.actionBtn} onClick={cardModalOpen}>
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
          }
          {cardDesc &&
            <IconButton className={classes.actionBtn} onClick={cardModalOpen}>
              <SubjectOutlinedIcon fontSize="small" />
            </IconButton>
          }
        </div>
        <Tooltip
          title={dragTip}
          placement="bottom-start"
          classes={{ tooltip: classes.dragTipWidth }}
        >
          <DragIndicatorIcon />
        </Tooltip>
      </CardActions>

      <CardModalContext.Provider
        value={{
          cardModalState,
          setCardModal,
          cardDesc,
          cardName,
          cardImg,
          listName,
          cardIndex,
        }}
      >
        <MyCardModal />
      </CardModalContext.Provider>
    </Card>
  );
}
