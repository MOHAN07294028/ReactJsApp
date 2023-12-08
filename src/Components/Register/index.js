import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import "../Styles/custom.css";
import ocsImage from "./ocs.jpg";
import FormField from "../Common/FormInput/FormComponent";
import { Row, Col, Input, Select, Button, notification } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  employeeId: yup.string().required("Employee Id is required"),
  gender: yup.string().required("Gender is required"),
  role: yup.string().required("Role is required"),
  fullName: yup.string().required("Full Name is required"),
  mobileNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile No is required"),
  address: yup.string().required("Address is required"),
  Password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required("Password is required"),
  dob: yup.date("Invalid DOB").required("DOB is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
});

function Register() {
  const [getRoles, setRoles] = useState([]);
  const [getGenders, setGenders] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async(values) => {
    const params ={
      Username:values.employeeId,
      Email:values.emailId,
      Password:values.Password,
      FullName:values.fullName,
      DateofBirth:values?.dob?.toLocaleDateString(),
      Address:values.address,
      PhoneNumber:values.mobileNo,
      Gender:values.gender,
      Role:values.role,
    }
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/saveRegisterData`;
      const response = await axios.post(apiUrl,params);
      if(response?.data?.status){
        notification.success({
          message:'Registration successfully'
        })
        // router.push('/Components/Login/index.js')
        window.location.href = '/Components/Login/index.js';
      }
    } catch (error) {
      notification.error({
        message:error?.message
      })
        window.location.href = '/Components/Login/index.js';
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const verificationMobileOTP = (values) => {
    console.log(values, "OTP");
  };

  const backtoLogin = (val) => {
    console.log(val);
  };

  useEffect(() => {
    fetchRoles();
    fetchGender();
  }, []);

  const fetchRoles = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/common/GetRoles`;
      const response = await axios.get(apiUrl);
      setRoles(response.data.result);
    } catch (error) {
      setRoles([]);
    }
  };
  const fetchGender = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/common/GetGenders`;
      const response = await axios.get(apiUrl);
      setGenders(response.data.result);
    } catch (error) {
      setGenders([]);
    }
  };

  console.log(getRoles,'getRoles')

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="registerContainer">
          <Row className="row mb-5">
            <Col span={10}>
              <img src={ocsImage} alt="OCS" width={200} />
            </Col>
            <Col
              span={10}
              style={{ fontSize: "35px", fontWeight: "bold", color: "#063d8a" }}
            >
              Register
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col span={12}>
              <Row className="mb-2">
                <Col span={24} className="mb-2">
                  {/* <span>
                    <GetLabelWithRequired
                      name={"employeeId"}
                      label={"Employee Id"}
                      errors={errors}
                    />
                  </span> */}
                  <FormField
                    name="employeeId"
                    control={control}
                    render="input"
                    label="Employee Id"
                    errors={errors}
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="emailId"
                    label={"Email Id"}
                    errors={errors}
                    control={control}
                    render="input"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="dob"
                    control={control}
                    label={"DOB"}
                    errors={errors}
                    render="datepicker"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="gender"
                    label={"Gender"}
                    errors={errors}
                    control={control}
                    options={getGenders}
                    nameKey="label"
                    valueKey="_id"
                    render="select"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="role"
                    label={"Role"}
                    errors={errors}
                    control={control}
                    options={getRoles}
                    nameKey="label"
                    valueKey="_id"
                    render="select"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="mb-2">
                <Col span={24} className="mb-2">
                  <FormField
                    name="fullName"
                    control={control}
                    label={"Full Name"}
                    errors={errors}
                    render="input"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="mobileNo"
                    control={control}
                    label={"Mobile No"}
                    errors={errors}
                    render="input"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="address"
                    control={control}
                    label={"Address"}
                    errors={errors}
                    render="input"
                  />
                </Col>
                <Col span={24} className="mb-2">
                  <FormField
                    name="Password"
                    control={control}
                    label={"Password"}
                    errors={errors}
                    render="password"
                  />
                </Col>
                <Col className="centerContent" span={24}>
                  <span style={{ display: "flex", alignItems: "end" }}>
                    <Button onClick={verificationMobileOTP} type="primary">
                      Send OTP
                    </Button>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    <FormField
                      name="OTP"
                      type="Number"
                      control={control}
                      label={"OTP"}
                      errors={errors}
                      render="input"
                    />
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="row mb-2">
            <Col className="centerContent" span={24}>
              <span>
                <Button htmlType="submit" type="primary">
                  Register
                </Button>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                <Button onClick={backtoLogin} type="primary">
                  Cancel
                </Button>
              </span>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}

export default Register;
