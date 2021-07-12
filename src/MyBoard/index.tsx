import React, { useState, useRef, useEffect } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DragUpdate,
} from 'react-beautiful-dnd'
import update from 'immutability-helper'
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MyCard from './components/MyCard'
import CardModalContext from './components/CardModalContext'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import ScrollContainer from 'react-indiana-drag-scroll'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myBoard: {
      width: '100%',
      height: window.innerWidth >= 1440 ? 'calc(100% - 96px)' : '568px',
    },
    container: {
      width: window.innerWidth >= 1440 ? '100%' : (InitialData.length > 3 ? '129%' : '100%'),
      height: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'flex-start',
    },
    column: {
      display: 'inline-block',
      verticalAlign: 'top',
      width: '292px',
      maxHeight: '97%',
      margin: '0 4px',
      backgroundColor: '#ebecf0',
      borderRadius: '3px',
      // display: 'flex',
      // flexDirection: 'column',
      // whiteSpace: 'nowrap',
      position: 'relative',
      '&:first-child': {
        marginLeft: '8px',
      },
    },
    columnTitle: {
      color: 'black',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '40px',
      margin: '0 20px',
      // position: 'relative',
    },
    columnContent: {
      minHeight: '20px',
      maxHeight: window.innerWidth >= 1440 ? '750px' : '462px',
      overflow: 'auto',
      borderRadius: '0 0 3px 3px',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    },
    columnContentActive: {
      minHeight: '20px',
      maxHeight: window.innerWidth > 1440 ? '750px' : '462px',
      overflow: 'auto',
      background: '#e2e4ea',
      borderRadius: '0 0 3px 3px',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    },
    issue: {
      position: 'relative',
      minHeight: '20px',
      // padding: '14px 44px',
      margin: '8px 10px',
    },
    issueDragging: {
      position: 'relative',
      minHeight: '20px',
      // padding: '14px 44px',
      opacity: 0.9,
      margin: '8px 10px',
    },
    addCardBtn: {
      margin: theme.spacing(1),
      width: '230px',
      textTransform: 'none',
      justifyContent: 'flex-start',
      color: '#5e6c84',
      fontSize: '14px',
    },
    addCardIcon: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(1),
    },
    addCardTemplate: {
      borderRadius: '4px',
      padding: theme.spacing(1),
    },
    addListBtn: {
      width: '264px',
      marginLeft: theme.spacing(1),
      justifyContent: 'flex-start',
      backgroundColor: alpha(theme.palette.common.black, 0.1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
      },
      textTransform: 'none',
    },
    scrollbar: {
      height: '100%',
      maxWidth: '100%',
    },
    scrollbarContainer: {
      height: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: window.innerWidth >= 1440 ? '100%' : (InitialData.length > 3 ? '140%' : '100%'),
    },
  })
)

interface initialDataInferface {
  id: number
  name: string
  issues: {
    id: number
    name: string
    img: string
    desc: string
  }[]
  acceptIds: number[]
}

interface ColumnProps {
  columnIndex: number
  activeColumn: initialDataInferface | null
  column: initialDataInferface
}

interface IssueProps {
  id: number
  issueIndex: number
  name: string
  img: string
  desc: string
  listName: string
}

const desginImg = 'https://i.loli.net/2021/07/12/ekJcjNLaslK6TCw.png'
const todoImg = 'https://i.loli.net/2021/06/29/JpkM7vYZOj2wmoW.png'
const doingImg = 'https://i.loli.net/2021/06/29/vutBn4UYkOVzci1.png'
const testImg = 'https://i.loli.net/2021/07/12/h7tJGasPAImnEk5.png'
const doneImg = 'https://i.loli.net/2021/06/29/4Pug6FdtjraDSTC.png'

const InitialData: initialDataInferface[] = [
  {
    id: 100,
    name: 'Todo',
    issues: [
      { id: 1, name: '吃饭', img: todoImg, desc: '人是铁，饭是钢，一顿不吃饿得慌' },
      { id: 2, name: '睡觉', img: '', desc: '' },
      { id: 3, name: '打豆豆', img: '', desc: '' },
    ],
    acceptIds: [200, 300, 400, 500], //? 全部可接受
    // acceptIds: [200],
  },
  {
    id: 200,
    name: 'Design',
    issues: [
      { id: 4, name: '原型设计', img: desginImg, desc: '' },
      { id: 5, name: 'UI设计', img: '', desc: '' },
    ],
    acceptIds: [100, 300, 400, 500], //? 全部可接受
  },
  {
    id: 300,
    name: 'Doing',
    issues: [
      { id: 6, name: '删库', img: doingImg, desc: '' },
      { id: 7, name: '跑路', img: '', desc: '' },
    ],
    acceptIds: [100, 200, 400, 500], //? 全部可接受
    // acceptIds: [300],
  },
  {
    id: 400,
    name: 'Testing',
    issues: [
      { id: 8, name: '代码测试', img: testImg, desc: '' }
    ],
    acceptIds: [100, 200, 300, 500],
  },
  {
    id: 500,
    name: 'Done',
    issues: [
      { id: 9, name: '完结撒花', img: doneImg, desc: '' }
    ],
    acceptIds: [100, 200, 300, 400],
  },
]

const initialDesc = `This is a list of things that are good to pull off to work on, prioritized.
If there are too few items here, we should swarm against getting tasks ready for work.`

for (let i = 10; i < 13; i++) {
  InitialData[0].issues.push({ id: i, name: `任务${i}`, img: '', desc: initialDesc })
}

const Issue = (props: IssueProps) => {
  const classes = useStyles()
  const { id, issueIndex, name, img, desc, listName } = props
  const [cardModalState, setCardModal] = useState(false)

  return (
    <Draggable draggableId={`${id}`} index={issueIndex}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          className={snapshot.isDragging ? classes.issueDragging : classes.issue}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardModalContext.Provider value={{ cardName: name, cardImg: img, cardDesc: desc, listName, cardIndex: issueIndex + 1, cardModalState, setCardModal }}>
            <MyCard />
          </CardModalContext.Provider>
        </div>
      )}
    </Draggable>
  )
}

const Column = (props: ColumnProps) => {
  const classes = useStyles()
  const { columnIndex, activeColumn, column } = props
  const { id, issues, name } = column

  //TODO 增加卡片功能没有实时刷新，有问题，确认保存后从服务器获取数据刷新表单？
  // const addCard = (issues:any) => {
  //   const tempLength = issues.length
  //   issues.push({ id: tempLength + 1, name: `任务${tempLength}`, img: '', desc: initialDesc })
  // }

  return (
    <div className={classes.column}>
      <div className={classes.columnTitle}>
        {column.name}({column.issues.length})
      </div>
      <Droppable
        droppableId={`${columnIndex}`}
        mode='virtual'
        isDropDisabled={
          activeColumn
            ? !(activeColumn.acceptIds.includes(id) || id === activeColumn.id)
            : true
        }
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver
                ? classes.columnContentActive
                : classes.columnContent
            }
            {...provided.droppableProps}
          >
            {issues.map((issue, index) => (
              <Issue
                key={issue.id}
                issueIndex={index}
                id={issue.id}
                name={issue.name}
                img={issue.img}
                desc={issue.desc}
                listName={name}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Box>
        <Button
          size="small"
          className={classes.addCardBtn}
          // onClick={() => addCard(issues)}
        >
          <AddOutlinedIcon
            fontSize="inherit"
            className={classes.addCardIcon}
          />
          Add another card
        </Button>
        <Tooltip
          title="Create from template..."
          placement="bottom-start"
        >
          <IconButton
            size="small"
            className={classes.addCardTemplate}
          >
            <PermMediaOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  )
}

const MyBoard = () => {
  const classes = useStyles()
  const [data, setData] = useState(InitialData)
  const [activeColumn, setActiveColumn] = useState<initialDataInferface | null>(
    null,
  )

  const onDragStart = (result: DragUpdate) => {
    const { source } = result
    const columnIndex = Number(source.droppableId)

    setActiveColumn(data[columnIndex])
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    if (!destination) {
      return
    }

    const fromColumnIndex = Number(source.droppableId)
    const fromIssueIndex = source.index
    const toColumnIndex = Number(destination.droppableId)
    const toIssueIndex = destination.index

    const TempIssue = data[fromColumnIndex].issues[fromIssueIndex]

    let TempData = update(data, {
      [fromColumnIndex]: {
        issues: (issues:any) =>
          update(issues, {
            $splice: [[fromIssueIndex, 1]],
          }),
      },
    })

    TempData = update(TempData, {
      [toColumnIndex]: {
        issues: (issues:any) =>
          update(issues, {
            $splice: [[toIssueIndex, 0, TempIssue]],
          }),
      },
    })

    setData(TempData)
    setActiveColumn(null)
  }

  const scrollbarContainer:any = useRef(null);

  useEffect(() => {
    if (scrollbarContainer.current) {
      scrollbarContainer.current.scrollTo(0, Math.random() * 5000)
    }
  }, []);

  return (
    <div className={classes.myBoard}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <OverlayScrollbarsComponent className={classes.scrollbar}>
          <ScrollContainer
            innerRef={scrollbarContainer}
            // 忽略的元素ignoreElements必须跟字符串，为类名，但是前面必须加一个'.'
            // for example, ".modal, dialog" or "*[prevent-drag-scroll]"
            ignoreElements={'.' + classes.column}
            className={classes.scrollbarContainer}
          >
              <div className={classes.container}>
                {data.map((column, index) => {
                  return (
                    <Column
                      columnIndex={index}
                      key={column.id}
                      activeColumn={activeColumn}
                      column={column}
                    />
                  )
                })}
                <Button
                  className={classes.addListBtn}
                >
                  <AddOutlinedIcon
                    fontSize="inherit"
                    className={classes.addCardIcon}
                  />
                  Add another list
                </Button>
              </div>
          </ScrollContainer>
        </OverlayScrollbarsComponent>
      </DragDropContext>
    </div>
  )
}

export default MyBoard