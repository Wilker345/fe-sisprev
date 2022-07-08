import React, {createContext} from 'react'
export const TableContext = createContext();

function TableProvider (props){

  return(
    <TableContext.Provider>
      {props.children}
    </TableContext.Provider>
  )
}
export default TableProvider
