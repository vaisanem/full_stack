import BaseMenu from './BaseMenu'
import ExtendedMenu from './ExtendedMenu'

const Menu = ({ token, logOut, setPage }) => {

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BaseMenu setPage={setPage} />
      <ExtendedMenu token={token} logOut={logOut} setPage={setPage} />
    </div>
  )
}

export default Menu