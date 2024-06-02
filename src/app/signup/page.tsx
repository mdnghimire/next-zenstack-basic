"use client";

import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "~/lib/hooks";

import prismaErrorHandler from "../../../utilities/prisma-error-handler";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const { mutateAsync: signup } = useCreateUser();
  const router = useRouter();

  async function onSignup(e: FormEvent) {
    e.preventDefault();
    try {
      await signup({ data: { email, password, username, phone } });

      toast.success("User added successfully");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      prismaErrorHandler(err);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.info?.prisma && err.info?.code === "P2002") {
        // P2002 is Prisma's error code for unique constraint violations
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        toast.error(err.info?.prisma);
        // toast.error("user already exists");
        // alert("User already exists");
      } else {
        alert("An unknown error occurred");
      }
      return;
    }

    // signin to create a session
    await signIn("credentials", { redirect: false, email, password });
    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-blue-800 p-6">
      <form
        className="mt-8 flex flex-col gap-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        onSubmit={(e) => void onSignup(e)}
      >
        <h1 className="mb-8 text-center text-5xl font-extrabold text-black">
          Sign up
        </h1>

        <div>
          <label htmlFor="email" className="inline-block w-32 text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="ml-4 w-72 rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="inline-block w-32 text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
            className="ml-4 w-72 rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="inline-block w-32 text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="ml-4 w-72 rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="inline-block w-32 text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="ml-4 w-72 rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-72 cursor-pointer rounded bg-blue-500 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
