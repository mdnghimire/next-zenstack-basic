"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "~/lib/hooks";
import prismaErrorHandler from "../../../utilities/prisma-error-handler";

import { Form, Input, Button, Typography, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

const { Title, Link } = Typography;

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const { mutateAsync: signup } = useCreateUser();
  const router = useRouter();

  async function onSignup(values: {
    email: string;
    password: string;
    username: string;
    phone: string;
  }) {
    try {
      await signup({
        data: {
          email: values.email,
          password: values.password,
          username: values.username,
          phone: values.phone,
        },
      });
      toast.success("User added successfully");
      router.push("/signin");
    } catch (err) {
      prismaErrorHandler(err);
      toast.error("An error occurred while creating the user");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Card
        style={{
          width: 400,
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Sign Up
        </Title>
        <Form name="signup" onFinish={onSignup} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: 8 }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Footer>
          <Link
            href="/signin"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 16,
              color: "#000",
            }}
          >
            <p className="text-black-600">Already have an account? Log In</p>
          </Link>
        </Footer>
      </Card>
    </div>
  );
};

export default Signup;
