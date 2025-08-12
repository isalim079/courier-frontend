import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  PARCEL_TYPES,
  WEIGHT_RANGES,
  FORM_STEPS,
} from "./constants/formConstants";

// Components
import BookParcelHeader from "./components/BookParcelHeader";
import ProgressSteps from "./components/ProgressSteps";
import SenderForm from "./components/SenderForm";
import RecipientForm from "./components/RecipientForm";
import PackageForm from "./components/PackageForm";
import PaymentForm from "./components/PaymentForm";
import NavigationButtons from "./components/NavigationButtons";
import useAxiosPublic from "../../../../API/useAxiosPublic";

function BookParcel() {
  const api = useAxiosPublic();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return [
          "senderName",
          "senderPhone",
          "senderAddress1",
          "senderCity",
          "senderPostalCode",
        ];
      case 2:
        return [
          "receiverName",
          "receiverPhone",
          "receiverAddress1",
          "receiverCity",
          "receiverPostalCode",
        ];
      case 3:
        return ["parcelType", "weightRange", "description"];
      case 4:
        return ["codAmount", "pickupSchedule"];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const parcelData = {
        senderInfo: {
          name: data.senderName,
          phone: data.senderPhone,
          address1: data.senderAddress1,
          address2: data.senderAddress2 || "",
          city: data.senderCity,
          postalCode: data.senderPostalCode,
          location: {
            lat: data.senderLat,
            lng: data.senderLng,
          },
        },
        receiverInfo: {
          name: data.receiverName,
          phone: data.receiverPhone,
          address1: data.receiverAddress1,
          address2: data.receiverAddress2 || "",
          city: data.receiverCity,
          postalCode: data.receiverPostalCode,
          location: {
            lat: data.receiverLat,
            lng: data.receiverLng,
          },
        },
        parcelDetails: {
          type: data.parcelType,
          weight: data.weightRange,
          description: data.description,
          specialInstructions: data.specialInstructions || "",
        },
        payment: {
          method: data.paymentMethod,
          codAmount: parseFloat(data.codAmount),
        },
        pickupSchedule: new Date(data.pickupSchedule),
      };


      const res = await api.post("/parcel/bookAParcel", parcelData);

      if (res.status === 200 || res.status === 201) {
        toast.success("Parcel booked successfully!");
        navigate("/customer.dashboard");
      } else {
        toast.error("Failed to book parcel. Please try again.");
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      toast.error(
        "An error occurred while booking the parcel. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SenderForm register={register} errors={errors} />;
      case 2:
        return <RecipientForm register={register} errors={errors} />;
      case 3:
        return (
          <PackageForm
            register={register}
            errors={errors}
            parcelTypes={PARCEL_TYPES}
            weightRanges={WEIGHT_RANGES}
          />
        );
      case 4:
        return (
          <PaymentForm
            register={register}
            errors={errors}
            setValue={setValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BookParcelHeader onBack={() => navigate("/customer.dashboard")} />

      <div className="p-6 max-w-4xl mx-auto">
        <ProgressSteps steps={FORM_STEPS} currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderCurrentStep()}
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={FORM_STEPS.length}
            isSubmitting={isSubmitting}
            onPrevious={prevStep}
            onNext={nextStep}
          />
        </form>
      </div>
    </div>
  );
}

export default BookParcel;
