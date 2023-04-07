import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/user";
import { setLoader } from "../../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { VALIDATION_RULES } from "../../helpers/ValidationRules";
const Login = () => {
  const dispatch = useDispatch();

  const redirect = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      redirect("/");
    }
  }, []);

  const handleSubmit = async (values) => {
    dispatch(setLoader(true));
    try {
      const { message, success, data } = await LoginUser(values);

      if (success) {
        dispatch(setLoader(false));
        localStorage.setItem("token", data);
        toast.success(message);
        window.location.href = "/";
      } else {
        if (message === "jwt expired") {
          throw new Error("Authentication Falied");
        } else {
          throw new Error(message);
        }
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className="text-primary ">
          ENJOYS <span className="text-gray-400">MARKETPLACE</span>
        </h1>
        <hr className="mb-4" />
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={VALIDATION_RULES}>
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={VALIDATION_RULES}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button className="mt-2" type="primary" htmlType="submit" block>
            Login
          </Button>
          <div className="mt-5 text-center">
            <span>
              New Here ?<Link to="/register"> Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
