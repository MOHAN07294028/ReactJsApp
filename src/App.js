import { useState } from "react";
import {
  Layout,
  Input,
  Menu,
  ColorPicker,
  Row,
  Col,
  Select,
  Avatar,
  Space,
} from "antd";
import { useForm } from "react-hook-form";
import "./Styles/custom.css";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const { handleSubmit, control, register } = useForm({});
  const [backgroundColor, setBackgroundColor] = useState("#a4e6e1"); // Default color
  const [contrastColor, setContrastColor] = useState("#000000"); // Default contrast color

  const handleColorChange = (color) => {
    let convertHex = color.toHexString();
    setBackgroundColor(convertHex);
    const contrast = getContrastColor(convertHex);
    setContrastColor(contrast);
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };
  const onSubmit = (val) => {
    console.log(val, "val");
  };
  const handlePageSearch = (val) => {
    console.log(val, "val");
  };

  const dateTime = new Date().toLocaleString();
  console.log(process.env.REACT_APP_API_URL);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width="15%">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
            background: backgroundColor,
            color: contrastColor,
          }}
        >
          <Menu.Item key="2">Option 1</Menu.Item>
          <Menu.Item key="3">Option 2</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{ background: backgroundColor, color: contrastColor }}
        >
          <Row className="row">
            <Col span={8}>
              <Select
                label="Mohan"
                showSearch
                control={control}
                onChange={(e) => {
                  handlePageSearch(e);
                }}
                onSearch={handlePageSearch}
                options={[]}
              />
            </Col>
            <Col span={12}></Col>
            <Col className="headerStyle" span={1}>
              <ColorPicker
                value={backgroundColor}
                onChange={(e) => handleColorChange(e)}
                format="rgb"
              />
            </Col>
            <Col className="headerStyle" span={1}>
              <Avatar shape="square" icon={<SettingOutlined />} />
            </Col>
            <Col className="headerStyle" span={1}>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              background: "#fff",
              padding: 25,
              marginLeft: "-1%",
              marginRight: "-1%",
              minHeight: "100%",
            }}
          >
            <h2>Content Area</h2>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
