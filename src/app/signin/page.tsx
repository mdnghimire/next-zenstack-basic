"use client";

import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

const { Title, Link } = Typography;

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSignin(values: { email: string; password: string }) {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      toast.error("Invalid credentials");
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
          Login Page
        </Title>
        <Form name="login" onFinish={onSignin} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
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
              Sign me in
            </Button>
          </Form.Item>
        </Form>
        <Footer>
          <Link
            href="/signup"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 16,
              color: "#000",
            }}
          >
            <p className="text-black">Don&apos;t have an account? Sign Up</p>
          </Link>
        </Footer>
      </Card>
    </div>
  );
};

export default Login;
