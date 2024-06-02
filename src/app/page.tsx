"use client";

import type { Post } from "@prisma/client";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useFindManyPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "../lib/hooks";

import { Button, Modal, Form, Input, Space, Skeleton } from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import prismaErrorHandler from "utilities/prisma-error-handler";
import { toast } from "react-toastify";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type AuthUser = { id: string; email?: string | null };

const Welcome = ({ user }: { user: AuthUser }) => {
  const router = useRouter();
  async function onSignout() {
    await signOut({ redirect: false });
    router.push("/signin");
  }
  return (
    <div className="flex gap-4">
      <h3 className="text-lg">Welcome back, {user?.email}</h3>
      <Button
        icon={<LogoutOutlined />}
        type="default"
        ghost
        onClick={() => void onSignout()}
      >
        Signout
      </Button>
    </div>
  );
};

const SigninSignup = () => {
  return (
    <div className="flex gap-4 text-2xl">
      <Link href="/signin" className="rounded-lg border px-4 py-2">
        Signin
      </Link>
      <Link href="/signup" className="rounded-lg border px-4 py-2">
        Signup
      </Link>
    </div>
  );
};

const Posts = ({ user }: { user: AuthUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const onReset = () => {
    form.resetFields();
  };

  // Post crud hooks
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: deletePost } = useDeletePost();

  // list all posts that're visible to the current user, together with their authors
  const { data: posts } = useFindManyPost({
    include: { createdBy: true },
    orderBy: { createdAt: "desc" },
  });

  const onFinish = async (values: {
    name: string;
    title: string;
    content: string;
  }) => {
    console.log(values);

    try {
      await createPost({
        data: {
          name: values.name,
          title: values.title,
          content: values.content,
          createdBy: { connect: { id: user.id } },
        },
      });
      setIsModalOpen(false);
      form.resetFields();
      toast.success("Post created successfully");
    } catch (error) {
      prismaErrorHandler(error);
    }
  };

  // async function onCreatePost() {}

  async function onTogglePublished(post: Post) {
    await updatePost({
      where: { id: post.id },
      data: { published: !post.published },
    });
  }

  async function onDelete(post: Post) {
    await deletePost({ where: { id: post.id } });
  }

  return (
    <div className="container flex flex-col text-white">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        // onClick={() => void onCreatePost()}
        onClick={() => showModal()}
      >
        Create Post
      </Button>

      <Modal
        footer={false}
        title="Post form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space className="flex justify-between">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <ul className="container mt-8 flex flex-col gap-2">
        {posts?.map((post) => (
          <li key={post.id} className="flex items-end justify-between gap-4">
            <p className={`text-2xl ${!post.published ? "text-gray-400" : ""}`}>
              {post.name}
              <span className="text-lg"> by {post.createdBy.email}</span>
            </p>
            <div className="flex w-32 justify-end gap-1 text-left">
              <button
                className="underline"
                onClick={() => void onTogglePublished(post)}
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button className="underline" onClick={() => void onDelete(post)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton avatar paragraph={{ rows: 4 }} />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white">
        <h1 className="text-5xl font-extrabold">My Awesome Blog</h1>

        {session?.user ? (
          // welcome & blog posts
          <div className="flex flex-col">
            <Welcome user={session.user} />
            <section className="mt-10">
              <Posts user={session.user} />
            </section>
          </div>
        ) : (
          // if not logged in
          <SigninSignup />
        )}
      </div>
    </main>
  );
};

export default Home;
