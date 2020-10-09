import React, { useState } from 'react'
import { Badge, Button, Media } from 'react-bootstrap'
import PropTypes from 'prop-types'
// import EditMenuItemModal from '../modals/EditMenuItemModal'
// import EditBurgerModal from '../modals/EditBurgerModal'
// import EditDrinkModal from '../modals/EditDrinkModal'

const MenuItem = ({ item = null }) => {
  // const [showEditMenu, setShowEditMenu] = useState(false)
  // const [showBurgerMenu, setShowBurgerMenu] = useState(false)
  // const [showDrinkMenu, setShowDrinkMenu] = useState(false)

  // const hideEditMenu = () => {
  //   setShowEditMenu(false)
  // }
  // const hideBurgerMenu = () => {
  //   setShowBurgerMenu(false)
  // }
  // const hideDrinkMenu = () => {
  //   setShowDrinkMenu(false)
  // }

  return (
    <>
      {/* {showEditMenu && <EditMenuItemModal show={showEditMenu} onHide={hideEditMenu} item={item} />}
      {showBurgerMenu && <EditBurgerModal show={showBurgerMenu} onHide={hideBurgerMenu} item={item} />}
      {showDrinkMenu && <EditDrinkModal show={showDrinkMenu} onHide={hideDrinkMenu} item={item} />} */}
      <div className="p-3 border-bottom gold-members">
        {/* todo don't use float-right... use flex insteead */}
        <span className="float-right">
          {item.available ? (
            <Button
              className="btn-medium ml-2"
              variant="outline-secondary"
              // onClick={() => {
              //   item.category.includes('burger')
              //     ? setShowBurgerMenu(true)
              //     : item.category.includes('sandwich')
              //       ? setShowEditMenu(true)
              //       : setShowDrinkMenu(true)
              // }}
            >
              ${(item.priceInCents / 100).toFixed(2)}
            </Button>
          ) : (
            <Button variant="outline-danger" className="btn-medium text-uppercase no-pointer ml-2" disabled>
                Sold Out
            </Button>
          )}
        </span>
        <Media>
          <Media.Body>
            <h4 className="mb-2 text-capitalize">
              <strong>{item.title}</strong>
              {item.badge && (
                <Badge variant="danger" className="ml-2 text-capitalize">
                  {item.badge}
                </Badge>
              )}
            </h4>
            <p className="text-gray mb-0">
              {item.subtitle &&
              (item.subtitle.charAt(item.subtitle.length - 1) === '.' ? item.subtitle.substring(0, item.subtitle.length - 1) : item.subtitle)}
            </p>
            {/* <p className="mb-0">${(item.priceInCents / 100).toFixed(2)}</p> */}
          </Media.Body>
        </Media>
      </div>
    </>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func,
  available: PropTypes.bool
}
MenuItem.defaultProps = {
  imageAlt: '',
  imageClass: '',
  showBadge: false,
  price: '',
  priceUnit: '$',
  showPromoted: false,
  badgeVariant: 'danger',
  available: true
}

export default MenuItem
