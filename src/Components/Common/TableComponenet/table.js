import React, { useState } from "react";
import { Button, Row, Col, Table, Input } from "antd";
import {
  MinusCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const TableComponenet = ({
  columns = [],
  dataSource = [],
  showControls,
  tableName,
  showRowSelection = true,
  showActionButtons,
  showGlobalSearch,
  clearCollapse,
  showAddDelete,
  showDelete = true,
  showAdd = true,
  size = "middle",
  onAddClick,
  onEditClick,
  onDeleteClick,
  onCancelClick,
  disableDeleteButton,
  showContextMenu,
  draggableColumn,
  rightComponent,
  rightBodyComponent,
  legendComponent,
  loading,
  contextMenu,
  commonSearchFilter,
  rightsId,
  showAcknowledgementIcon,
  handleAcknowledgementClick,
  fullHeight,
  additionalIcons,
  exportFileName,
  showExpandFilter = true,
  ...rest
}) => {
  const [data, setData] = useState(dataSource);
  const [cols, setCols] = useState(columns);
  return (
    <div>
      <Row style={{ display: "flex", justifyContent: "end" }}>
      <Col span={12}>
                <h4 style={{color:'#063D8A'}} >{tableName}</h4>
            </Col>
        <Col span={6}>
          <Input />
        </Col>
        <Col span={1}>
          <Button type="primary" icon={<SearchOutlined />} shape="circle" />
        </Col>
        <Col span={2}>
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={onAddClick} >
            Add
          </Button>
        </Col>
        <Col span={2}>
          <Button type="primary" icon={<MinusCircleOutlined />}>
            Delete
          </Button>
        </Col>
      </Row>
      <div>
        <Table dataSource={data} columns={cols} />
      </div>
    </div>
  );
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const initialData = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

export default TableComponenet;

TableComponenet.propTypes = {
  tableName: PropTypes.string,
  rowKey: PropTypes.string,
  showHeader: PropTypes.bool,
  showRowSelection: PropTypes.bool,
  showActionButtons: PropTypes.bool,
  bordered: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["default", "middle", "small"]),
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  showGlobalSearch: PropTypes.bool,
  clearCollapse: PropTypes.bool,
  showAddDelete: PropTypes.bool,
  showControls: PropTypes.bool,
  disableDeleteButton: PropTypes.bool,
  draggableColumn: PropTypes.bool,
  showContextMenu: PropTypes.bool,
  showAcknowledgementIcon: PropTypes.bool,
  handleAcknowledgementClick: PropTypes.func,
};

TableComponenet.defaultProps = {
  dataSource: initialData,
  columns: columns,
  showControls: true,
  showHeader: true,
  bordered: false,
  loading: false,
  pagination: {
    // position: 'bottom',
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100", "300", "500"],
    // showTotal: (total, range) => {
    //   return `${range[0]}-${range[1]} of ${total} items`;
    // },
  },
  size: "middle",
  showRowSelection: true,
  showActionButtons: true,
  showGlobalSearch: true,
  clearCollapse: true,
  showAddDelete: true,
  draggableColumn: true,
  showContextMenu: true,
  showAcknowledgementIcon: false,
  commonSearchFilter: () => {},
};
