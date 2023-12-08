import React from "react";
import TableComponenet from "./Common/TableComponenet/table";

const HRManagerDataEntry = () => {
    const onAddClick =()=>{
        console.log('added')
    }
  
  return (
    <div>
        <TableComponenet tableName='Mohanraj Srinivasan' dataSource={[]}  columns={[]} onAddClick={onAddClick} />
    </div>
  );
};

export default HRManagerDataEntry;
