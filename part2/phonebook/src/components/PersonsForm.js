import React from 'react'

const Input = ({ input }) => {
  return (
    <div>
      {input.text}
      <input 
        value={input.value} 
        onChange={input.onChange}>
      </input>
    </div>
  )
}

const PersonsForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} >
      {props.inputs.map(input => 
        <Input key={input.text} input={input} />
      )}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonsForm