import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ReceiptIcon from '@material-ui/icons/Receipt'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import HistoryIcon from '@material-ui/icons/History'
import Icon from '../common/FontAwesome'
import { useUntouchedCount } from '../../services/IncomingOrder'

import classNames from 'classnames'

const drawerWidth = 100

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function Sidebar(props) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { count, isCountLoading, isCountError } = useUntouchedCount()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key='Incoming Order' divider className='sidenav-item'>
          <ListItemIcon>
            <Link href='/order-incoming' passHref>
              <ReceiptIcon
                style={{ fontSize: 50 }}
                className='sidenav-item__icon'
              />
            </Link>
            {count && count > 0 ? <div className='touch-dot__nav'></div> : <></>}
          </ListItemIcon>
          {/* <ListItemText primary='Incoming Order' /> */}
        </ListItem>
        <ListItem button key='Inprogress' divider className='sidenav-item'>
          <ListItemIcon>
            <Link href='/order-preparing' passHref>
              <OutdoorGrillIcon
                style={{ fontSize: 50 }}
                className='sidenav-item__icon'
              />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary='Inprogress' /> */}
        </ListItem>
        <ListItem
          button
          key='Ready for Pickup'
          divider
          className='sidenav-item'>
          <ListItemIcon>
            <Link href='/order-ready' passHref>
              <LocalMallIcon
                style={{ fontSize: 50 }}
                className='sidenav-item__icon'
              />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary='Ready for Pickup' /> */}
        </ListItem>
        <ListItem button key='History' divider className='sidenav-item'>
          <ListItemIcon>
            <Link href='/order-history' passHref>
              <HistoryIcon
                style={{ fontSize: 50 }}
                className='sidenav-item__icon'
              />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary='History' /> */}
        </ListItem>
      </List>
    </div>
  )

  return (
    <Hidden smDown implementation='css'>
      <Drawer
        variant='permanent'
        anchor={'left'}
        open
        classes={{
          paper: classNames(classes.drawerPaper)
        }}>
        {drawer}
      </Drawer>
    </Hidden>
  )
}
