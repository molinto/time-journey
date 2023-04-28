import { signIn } from "next-auth/react";
import Button from "../Button";
import GithubIcon from "../icons/GithubIcon";
import GoogleIcon from "../icons/GoogleIcon";

const OAuthButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        outline
        onClick={() => signIn("google")}
        label="Continue with Google"
        icon={GoogleIcon}
        type="button"
      />
      <Button
        outline
        onClick={() => signIn("github")}
        label="Continue with Github"
        icon={GithubIcon}
        type="button"
      />
    </div>
  );
};

export default OAuthButtons;
