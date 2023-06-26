const Notification = ({ message, type }) => {
    if( message === null)  {
        return null
    }
    if(type === 'Green')
    {
        return (
            <div className="messageSuccess">
                {message}
            </div>
        )
    }
    else 
    {
        return (
            <div className="messageError">
                {message}
            </div>
        )

    }


}

export default Notification