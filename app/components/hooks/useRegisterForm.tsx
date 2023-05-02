import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../utils/reduxHooks";
import { close } from "../modals/modalSlice";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitRegisterForm: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/register", data)
      .then(() => dispatch(close))
      .catch((error) => {
        // toast.error(error.message);
      });

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        // toast.success("Logged In");
        // loginModal.onClose();
      }

      if (callback?.error) {
        // toast.error(callback.error);
      }
    });
    setLoading(false);
  };

  return { loading, submitRegisterForm };
};

export default useRegister;
