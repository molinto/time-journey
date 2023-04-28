import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import useLoginStore from "./useLoginStore";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginStore();
  //   const router = useRouter()
  const submitLoginForm: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Logged in");
          //   router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .finally(() => setLoading(false));
  };
  return { loading, submitLoginForm };
};

export default useLoginForm;
