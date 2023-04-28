import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import useLoginStore from "./useLoginStore";
import useRegisterStore from "./useRegisterStore";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const registerModal = useRegisterStore();
  const loginModal = useLoginStore();

  const submitRegisterForm: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((error) => {
        toast.error(error.message);
      });

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged In");
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
    setLoading(false);
  };

  return { loading, submitRegisterForm };
};

export default useRegister;
