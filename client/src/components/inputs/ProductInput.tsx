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
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import { OctagonAlert, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { useQRDataStore } from "@/store/QrStore";

type FormValues = {
  source: string;
  destination: string;
  departureDate: Date;
  temperature: number;
  humidity: number;
  shock: number;
  pressure: number;
  extraInfo: string;
};

type InputBoxData = {
  label: string;
  id: string;
  type?: "text" | "date";
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

type Props = {};

function ProductInput({}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const setQRData = useQRDataStore((state) => state.setQRData);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setQRData(data);
  };

  return (
    <AnimatePresence>
      <div className="w-full h-full font-poppins relative">
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "fade",
          }}
          className="w-full h-full flex justify-center items-center"
        >
          <Card className="w-full h-full rounded-2xl flex flex-col z-10 overflow-hidden">
            <CardHeader className="bg-indigo-500 border-[6px] border-white rounded-2xl text-white">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                Product details
                <PackageOpen />
              </CardTitle>
              <CardDescription className="text-white">
                Fill all the fields with the corresponding details
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 px-4 max-h-[540px] flex-grow overflow-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full flex flex-col items-center justify-center gap-4"
              >
                <div className="w-full flex flex-col gap-4 md:flex-row">
                  <InputBlock
                    label="Source"
                    id="source"
                    placeholder="e.g. dehradun"
                    error={errors.source}
                    register={register("source", {
                      required: "Source is required",
                    })}
                  />

                  <InputBlock
                    label="Destination"
                    id="destination"
                    placeholder="e.g. delhi"
                    error={errors.destination}
                    register={register("destination", {
                      required: "Destination is required",
                    })}
                  />
                </div>

                <InputBlock
                  label="Date"
                  id="date"
                  type="date"
                  placeholder="e.g. 1/2/2024"
                  error={errors.departureDate}
                  register={register("departureDate", {
                    required: "Date is required",
                  })}
                />

                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <InputBlock
                    label="Temperature"
                    id="temperature"
                    placeholder="e.g. 25"
                    error={errors.temperature}
                    register={register("temperature", {
                      required: "required",
                    })}
                  />
                  <InputBlock
                    label="Humidity"
                    id="humidity"
                    placeholder="e.g. 24"
                    error={errors.humidity}
                    register={register("humidity", {
                      required: "required",
                    })}
                  />
                  <InputBlock
                    label="Shock"
                    id="shock"
                    placeholder="e.g. 40"
                    error={errors.shock}
                    register={register("shock", {
                      required: "required",
                    })}
                  />
                  <InputBlock
                    label="Pressure"
                    id="pressure"
                    placeholder="e.g. 30"
                    error={errors.pressure}
                    register={register("pressure", {
                      required: "required",
                    })}
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <Label
                    htmlFor="extraInfo"
                    className="font-semibold text-base pl-[2px]"
                  >
                    Extra info
                  </Label>
                  <Textarea
                    rows={4}
                    className="rounded-lg  px-3 py-4 border-4 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
                    id="extraInfo"
                    placeholder="Describe about the product"
                    {...register("extraInfo", {
                      required: {
                        value: true,
                        message: "Enter the extraInfo",
                      },
                    })}
                  />
                  {errors.extraInfo && (
                    <span className="mt-1 ml-1 text-sm text-red-500 flex items-center gap-1">
                      <OctagonAlert className="w-5 h-5" />
                      {errors.extraInfo.message}
                    </span>
                  )}
                </div>

                <div className="w-full flex justify-between items-center gap-4">
                  <Button
                    type="submit"
                    className="bg-indigo-500 w-full hover:bg-indigo-600"
                  >
                    Submit
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
  type = "text",
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
        type={type}
        id={id}
        placeholder={placeholder}
        className="h-11 rounded-lg px-3 py-4 border-4 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
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

export default ProductInput;
