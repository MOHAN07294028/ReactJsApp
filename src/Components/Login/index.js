import React, { useState } from "react";
import "../Styles/custom.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col, Button, notification, Flex, Spin } from "antd";
import FormField from "../Common/FormInput/FormComponent";
import axios from "axios";
import LayoutColors from "../../GetColors";
import LayoutMainFrame from "../Layout";

function Login() {
  const validationSchema = yup.object().shape({
    employeeId: yup.string().required("Employee Id is required"),
    Password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setloading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    const params = {
      EmployeeId: values.employeeId,
      Password: values.Password,
    };
    setloading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/loginData`;
      const response = await axios.post(apiUrl, params);
      if (response?.data?.status) {
        let data = response.data.result;
        notification.success({
          message: "Login successfully",
        });
        sessionStorage.setItem("loginData", JSON.stringify(data));
        sessionStorage.setItem("is_AuthorizedToLogin", "true");
        sessionStorage.setItem("bgColor", LayoutColors.backgroundColor);
        sessionStorage.setItem("ctColor", LayoutColors.contrastColor);
        setloggedIn(true);
        setloading(false);
      } else {
        sessionStorage.setItem("loginData", JSON.stringify([]));
        sessionStorage.setItem("is_AuthorizedToLogin", "false");
        setloggedIn(false);
        setloading(false);
        notification.success({
          message: response?.data?.result,
        });
      }
    } catch (error) {
      sessionStorage.setItem("loginData", JSON.stringify([]));
      sessionStorage.setItem("is_AuthorizedToLogin", "false");
      setloggedIn(false);
      setloading(false);
      notification.error({
        message: "Invalid Credintials",
      });
    }
  };
  const onError = async (values) => {};
  return (
    <Spin spinning={loading}>
      <div>
        {loggedIn == false && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="loginContainer">
              <Row className="row mb-5">
                <Col
                  span={24}
                  style={{
                    fontSize: "35px",
                    fontWeight: "bold",
                    color: "#063d8a",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Login
                </Col>
              </Row>
              <Row className="row mb-4">
                <Col span={24} className="mb-4">
                  <FormField
                    name="employeeId"
                    control={control}
                    render="input"
                    label="Employee Id"
                    errors={errors}
                  />
                </Col>
                <Col span={24} className="mb-4">
                  <FormField
                    name="Password"
                    control={control}
                    label={"Password"}
                    errors={errors}
                    render="password"
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={24} className="centerContent">
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ width: "50%" }}
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </div>
          </form>
        )}
        {loggedIn == true && <LayoutMainFrame />}
      </div>
    </Spin>
  );
}

export default Login;
