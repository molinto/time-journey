import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../utils/reduxHooks";
import { close } from "../modals/modalSlice";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"email" | "password" | null>(null);
  const dispatch = useAppDispatch();
  //   const router = useRouter()
  const submitLoginForm: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError(null);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          if (res.error === "email") {
            setError("email");
          }
          if (res.error === "password") {
            setError("password");
          }
        } else {
          toast.success("Logged in");
          //   router.refresh();
          dispatch(close);
        }
      })
      .finally(() => setLoading(false));
  };
  return { loading, submitLoginForm, error };
};

export default useLoginForm;
