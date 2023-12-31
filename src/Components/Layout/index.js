import { useState, useEffect } from "react";
import { Layout, Menu, ColorPicker, Row, Col, Avatar, Spin } from "antd";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../Styles/custom.css";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import Employee from "../employee";
import Dashboard from "../dashboard";
import Manager from "../manager";
import NotFound from "../../Pages/NotFound";
import FormField from "../Common/FormInput/FormComponent";
import HRManagerDataEntry from "../hrManagerDataEntryPage";
import LayoutColors from "../../GetColors";
import Login from "../Login";
const { Header, Content, Footer, Sider } = Layout;

function LayoutMainFrame({ children }) {
  const {
    control,
    formState: { errors },
  } = useForm({});
  const [backgroundColor, setBackgroundColor] = useState(
    sessionStorage.getItem("bgColor") || LayoutColors.backgroundColor
  ); // Default color
  const [contrastColor, setContrastColor] = useState(
    sessionStorage.getItem("ctColor") || LayoutColors.contrastColor
  ); // Default contrast color
  const [getPages, setPages] = useState([]);
  const [renderedComponent, setRenderedComponent] = useState(null);
  const [loading, setloading] = useState(false);

  let ISLOGIN = sessionStorage.getItem("is_AuthorizedToLogin");

  const handleColorChange = (color) => {
    let convertHex = color.toHexString();
    sessionStorage.setItem("bgColor", convertHex);
    setBackgroundColor(sessionStorage.getItem("bgColor") || convertHex);
    const contrast = getContrastColor(convertHex);
    sessionStorage.setItem("ctColor", contrast);
    setContrastColor(sessionStorage.getItem("ctColor") || contrast);
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  useEffect(() => {
    fetchPagePaths();
  }, []);

  const fetchPagePaths = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/common/pagePaths`;
      const response = await axios.get(apiUrl);
      setPages(response.data.result);
    } catch (error) {
      setPages([]);
    }
  };
  let pageSessionPath = sessionStorage.getItem('pagePath')
  const [getPathName, setPathName] = useState(pageSessionPath ? pageSessionPath : '/');
  console.log(getPathName, "getPathName");
  const handlePageSearch = (val) => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, [1000]);
    const data = getPages?.filter((i) => i._id == val);
    const component = getComponent(data[0]?.pagePath);
    const path = data[0]?.pagePath;
    setPathName(path);
    // setRenderedComponent(component);
    // getComponent(path)
    // window.location.hash = path
    // clearLastURLSegment();
    // if (path) {
    //   window.history.pushState(null, null, path);
    //   setRenderedComponent(component);
    // }
  };

  const clearLastURLSegment = () => {
    const url = window.location.href;
    const segments = url.split("/");
    segments.pop();
    const newUrl = segments.join("/");
    window.history.pushState({}, "", newUrl);
  };

  console.log( sessionStorage.getItem('pagePath'),' sessionStorage.setItem')

  const getComponent = (path) => {
    window.history.pushState(null, null, path);
    sessionStorage.setItem('pagePath',path)
    console.log(path, "enter");
    switch (path) {
      case "/hrmanagerdataentry":
        return <HRManagerDataEntry />;
      case "/dashboard":
        return <Dashboard />;
      case "/employee":
        return <Employee />;
      case "/manager":
        return <Manager />;
        case "/":
          return <NotFound />;
      default:
        window.history.pushState(null, null, "/");
        return <NotFound />;
    }
  };

  // useEffect(() => {
  //   if (renderedComponent === null) {
  //     window.history.pushState(null, null, "/dashboard");
  //     setRenderedComponent(Dashboard);
  //   }
  // }, [renderedComponent]);

  return (
    <Spin spinning={loading}>
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
            <Row
              className="row"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <Col span={8}>
                <FormField
                  name="pagePaths"
                  control={control}
                  showSearch
                  options={getPages}
                  errors={errors}
                  nameKey="label"
                  valueKey="_id"
                  onChange={(e) => {
                    handlePageSearch(e);
                  }}
                  defaultValue={"657037d38f9ad8d204d9273f"}
                  render="select"
                />
              </Col>
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
              {getComponent(getPathName)}
              {/* {renderedComponent ? renderedComponent : <Dashboard />} */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center", padding: "15px 50px" }}>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Spin>
  );
}

export default LayoutMainFrame;
