import Button from "@/app/components/Button";
import Link from "next/link";

const UploadSuccess = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <p>Thank you!</p>
      <Link href={"/upload"}>
        <Button label={"Upload another one"} type={"button"} />
      </Link>
    </div>
  );
};

export default UploadSuccess;
