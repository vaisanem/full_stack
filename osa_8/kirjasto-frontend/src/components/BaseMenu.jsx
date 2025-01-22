const BaseMenu = ({ setPage }) => {

  return (
    <div>
      <button onClick={() => setPage("authors")}>Authors</button>
      <button onClick={() => setPage("books")}>Books</button>
    </div>
  )
}

export default BaseMenu