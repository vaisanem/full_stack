const Recommend = ({ show }) => {

  if (!show) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre</p>
    </div>
  )
}

export default Recommend