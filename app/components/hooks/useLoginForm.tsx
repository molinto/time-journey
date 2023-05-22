import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../utils/reduxHooks";
import { close } from "../modals/modalSlice";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthForm>();

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          switch (res.error) {
            case "email":
              setError(
                res.error,
                { type: "custom", message: "User not found." },
                { shouldFocus: true }
              );
            case "password":
              setError(
                res.error,
                { type: "custom", message: "Incorrect password." },
                { shouldFocus: true }
              );
            default:
              setError(
                "root",
                { type: "custom", message: "Something went wrong." },
                { shouldFocus: true }
              );
          }
        } else {
          toast.success("Logged in");
          dispatch(close());
        }
      })
      .finally(() => setLoading(false));
  });
  return { errors, register, handleFormSubmit, loading };
};

export default useLoginForm;
