const Numbers = ({id, name, number, deleteContact }) => {
    return ( 
      <>
    <p>{name} {number}</p>
    <button onClick={deleteContact}>Delete</button>
    </>
    )
    
  }

  export default Numbers