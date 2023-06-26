import { useSelector } from "react-redux"
const Notification = () => {
    let style = {display: 'none'}
    const notification = useSelector(state => state.notification)
    if(notification === '') {
        style = {
            display: 'none'
          }
    } else {
        style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
            marginBottom: 10
          }
    }

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  
  export default Notification