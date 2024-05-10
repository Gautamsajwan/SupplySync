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
import toast from "react-hot-toast";
import { OctagonAlert, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormValues = {
  productName: string;
  productQty: number;
};

type InputBoxData = {
  label: string;
  id: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

type Props = {};

function InventoryInput({}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  return (
    <AnimatePresence>
      <div className="w-full p-4 relative flex justify-center items-center">
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
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
                ProductDetails
                <Plus className="text-xl" />
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
                  label="Product Name"
                  id="productName"
                  placeholder="Enter the productName"
                  error={errors.productName}
                  register={register("productName", {
                    required: "productName is required",
                  })}
                />

                <InputBlock
                  label="Product Qty."
                  id="productQty"
                  placeholder="Enter the productQty"
                  error={errors.productQty}
                  register={register("productQty", {
                    required: "productQty is required",
                  })}
                />

                {/* Form Buttons */}
                <div className="w-full flex justify-between items-center gap-4">
                  <Button type="button" variant="outline" className="w-1/2">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-400 w-1/2 hover:bg-blue-500"
                  >
                    Add to inventory
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

function InputBlock({ label, id, placeholder, error, register }: InputBoxData) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold text-base pl-[2px]">
        {label}
      </Label>
      <Input
        type="text"
        id={id}
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

export default InventoryInput;
