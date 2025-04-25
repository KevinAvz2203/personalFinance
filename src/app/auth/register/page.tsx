"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch("/api/auth/registration", {
      method: "POST",
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        age: Number(data.age),
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="h-[calc(100vh)] flex justify-center items-center bg-neutral-950">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

        <label
          htmlFor="first_name"
          className="text-slate-500 mb-2 block text-sm"
        >
          First Name:
        </label>
        <input
          type="text"
          id="first_name"
          {...register("first_name", {
            required: {
              value: true,
              message: "First Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Insert First Name"
        />
        {errors.first_name && (
          <span className="text-red-500 text-xs">
            {errors.first_name.message}
          </span>
        )}

        <label
          htmlFor="last_name"
          className="text-slate-500 mb-2 block text-sm"
        >
          Last Name:
        </label>
        <input
          type="text"
          id="last_name"
          {...register("last_name", {
            required: {
              value: true,
              message: "Last Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Insert Last Name"
        />
        {errors.last_name && (
          <span className="text-red-500 text-xs">
            {errors.last_name.message}
          </span>
        )}

        <label htmlFor="age" className="text-slate-500 mb-2 block text-sm">
          Age:
        </label>
        <input
          type="number"
          id="age"
          {...register("age", {
            required: {
              value: true,
              message: "Age is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Insert Age"
        />
        {errors.age && (
          <span className="text-red-500 text-xs">{errors.age.message}</span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="email@example.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="*****"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            validate: (value) =>
              value === "" ||
              value === watch("password") ||
              "Passwords do not match",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="*****"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}
