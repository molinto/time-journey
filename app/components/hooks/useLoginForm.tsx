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
        console.log(res);
        if (res?.error) {
          switch (res.error) {
            case "email":
              console.log("email");
              setError(
                res.error,
                { type: "custom", message: "User not found." },
                { shouldFocus: true }
              );
              break;
            case "password":
              console.log("password");
              setError(
                res.error,
                { type: "custom", message: "Incorrect password." },
                { shouldFocus: true }
              );
              break;
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
