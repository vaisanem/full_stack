import BaseMenu from './BaseMenu'
import ExtendedMenu from './ExtendedMenu'

const Menu = ({ token, setToken, setPage }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BaseMenu setPage={setPage} />
      <ExtendedMenu token={token} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default Menu