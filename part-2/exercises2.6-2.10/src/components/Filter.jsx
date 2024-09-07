const Filter = ({find, HandleFindChange}) => {
  return(
    <div>
      filter shown with <input value={find} onChange={HandleFindChange} />
      <p></p>
    </div>
  )
}

export default Filter;