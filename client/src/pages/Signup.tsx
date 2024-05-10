"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { OctagonAlert, Code2, Syringe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
  ethToken: string;
  role: string;
};

type InputBoxData = {
  label: string;
  id: string;
  type?: "text" | "number" | "password";
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

type Props = {};

function Signup({}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const { setToken, setUserData } = useAuthStore((state) => state);

  const handleSignup = async (data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            ethToken: data.ethToken,
            role: data.role,
          }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("signed up successfully");
        setUserData(result.userData);
        setToken(result.token);

        localStorage.setItem("token", result.token);
        localStorage.setItem("userData", JSON.stringify(result.userData));

        router.push("/");
      } else {
        toast.error(result.message);
      }

      console.log("result: ", result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleSignup(data);
  };

  return (
    <AnimatePresence>
      <div className="w-full min-h-screen p-4 relative flex justify-center items-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "fade",
          }}
          className="flex justify-center items-center"
        >
          <Card className="sm:w-[600px] h-auto overflow-hidden flex flex-col rounded-2xl z-10">
            <CardHeader className="bg-blue-300 border-[6px] border-white rounded-t-2xl rounded-b-xl">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                Signup
                <Syringe className="text-xl" />
              </CardTitle>
              <CardDescription className="font-semibold text-gray-900">
                Fill all the fields with the corresponding details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex-grow overflow-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <InputBlock
                  label="Email"
                  id="email"
                  placeholder="Enter the email"
                  error={errors.email}
                  register={register("email", {
                    required: "email is required",
                  })}
                />

                <InputBlock
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  error={errors.password}
                  register={register("password", {
                    required: "password is required",
                  })}
                />

                <InputBlock
                  label="Eth Token"
                  id="ethToken"
                  placeholder="Enter the ethToken"
                  error={errors.ethToken}
                  register={register("ethToken", {
                    required: "ethToken is required",
                  })}
                />

<div className="w-full flex flex-col gap-2">
                    <Label
                      htmlFor="platformName"
                      className="font-semibold text-base pl-[2px]"
                    >
                      Role
                    </Label>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: "please specify role" }}
                      render={({ field }: any) => (
                        <>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={(value: string) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger className="h-11 rounded-lg px-3 py-4 border-2 focus-visible:ring-0 focus:border-orange-500">
                              <SelectValue placeholder="Pick role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturer">manufacturer</SelectItem>
                              <SelectItem value="retailer">retailer</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    />
                    {errors.role && (
                      <span className="mt-1 ml-1 text-sm text-red-500 flex items-center gap-1">
                        <OctagonAlert className="w-5 h-5" />
                        {errors.role.message}
                      </span>
                    )}
                  </div>

                {/* Form Buttons */}
                <div className="w-full flex justify-between items-center gap-4">
                  <Button type="button" variant="outline" className="w-1/2">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-400 w-1/2 hover:bg-blue-500"
                  >
                    Signup
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function InputBlock({
  label,
  id,
  type,
  placeholder,
  error,
  register,
}: InputBoxData) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold text-base pl-[2px]">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`h-11 rounded-lg px-3 py-4 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-orange-500`}
        {...register}
      />
      {error && (
        <span className="mt-1 ml-1 text-sm text-red-500 flex items-center gap-1">
          <OctagonAlert className="w-5 h-5" />
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Signup;
