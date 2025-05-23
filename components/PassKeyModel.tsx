/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/actions/utils";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PassKeyModel = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passKey, setpassKey] = useState('')
  const [error, setError] = useState('')

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey as string);

    if(path){
        if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            setOpen(false);
            router.push("/admin");
          }else {
                setOpen(true);
                }
          }
    },[encryptedKey]);
  

  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
    const encryptedKey = encryptKey(passKey);
    localStorage.setItem("accessKey", encryptedKey);
  }else {
        setError("Invalid PassKey. Please try again.")
        }
  }

  const closeModel = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="Close"
              height={20}
              width={20}
              onClick={() => closeModel()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={passKey} onChange={(value) => setpassKey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p> }
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePassKey(e)}
            className="shad-primary-btn w-full">
            Enter Admin PassKey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModel;
