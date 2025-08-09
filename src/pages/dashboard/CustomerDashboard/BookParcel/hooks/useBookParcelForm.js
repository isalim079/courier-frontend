import { useState } from "react";

export function useBookParcelForm() {
  const [formData, setFormData] = useState({
    // Sender Information
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCity: "",
    senderPincode: "",

    // Recipient Information
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",
    recipientCity: "",
    recipientPincode: "",

    // Package Information
    packageType: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    value: "",
    description: "",
    specialInstructions: "",

    // Service Options
    serviceType: "standard",
    pickupDate: "",
    pickupTime: "",
    deliveryType: "door-to-door",
    insurance: false,
    signatureRequired: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section, field, value) => {
    if (section === "dimensions") {
      setFormData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculatePrice = (serviceTypes) => {
    const selectedService = serviceTypes.find((s) => s.id === formData.serviceType);
    let basePrice = selectedService?.price || 15;
    
    const weight = parseFloat(formData.weight) || 1;
    if (weight > 5) {
      basePrice += (weight - 5) * 2;
    }

    if (formData.insurance) {
      const value = parseFloat(formData.value) || 0;
      basePrice += Math.max(5, value * 0.01);
    }

    return basePrice.toFixed(2);
  };

  const handleSubmit = async (navigate) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/customer.dashboard");
      // You can add a success notification here
    }, 2000);
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    handleInputChange,
    nextStep,
    prevStep,
    calculatePrice,
    handleSubmit,
  };
}
