import React from 'react'

function GetLabelWithRequired({label,name,errors}) {
  return (
    <div>
          <span>{label}{errors[name] && <span className="requiredHighlight" >{` - ${errors[name].message}`}</span>}</span>
    </div>
  )
}

export default GetLabelWithRequired