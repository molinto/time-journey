"use client";

import Button from "../Button";
import Input from "../Input";
import { handleKeyDown } from "../utils/formUtils";
import Modal from "./Modal";
import OAuthButtons from "./OAuthButtons";
import { open } from "./modalSlice";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import useLoginForm from "../hooks/useLoginForm";

const LoginModal = () => {
  const isOpen = useAppSelector((state) => state.modal.value === "login");
  const dispatch = useAppDispatch();
  const { loading, handleFormSubmit, register, errors } = useLoginForm();

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <form
        onKeyDown={handleKeyDown}
        className="flex flex-col items-center gap-3"
        onSubmit={handleFormSubmit}
      >
        <Input
          type="email"
          id="email"
          disabled={loading}
          register={register}
          errors={errors}
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          }}
        />
        <Input
          type="password"
          id="password"
          disabled={loading}
          register={register}
          errors={errors}
        />
        <Button label="Log in" type="submit" />
      </form>
      <hr />
      <OAuthButtons />
    </div>
  );

  const footerContent = (
    <div className="flex items-center justify-between">
      <p>Don:&apos;t have an account yet?</p>
      <a
        href=""
        className="underline transition duration-200 hover:text-gray-400"
        onClick={(e) => {
          e.preventDefault();
          dispatch(open("register"));
        }}
      >
        Register
      </a>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      title="Log in"
      body={bodyContent}
      footer={footerContent}
      isOpen={isOpen}
    />
  );
};
export default LoginModal;
