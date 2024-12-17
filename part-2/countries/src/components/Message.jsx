const Message = ({many}) =>{
    if (!many) {
        return null
    }
    return(
        <div>
            <p>Too many countries to display try a more specific search.</p>
        </div>
    )
}

export default Message;