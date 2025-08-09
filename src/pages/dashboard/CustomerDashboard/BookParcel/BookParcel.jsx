import { useNavigate } from "react-router-dom";
import { useBookParcelForm } from "./hooks/useBookParcelForm";
import { PACKAGE_TYPES, SERVICE_TYPES, FORM_STEPS } from "./constants/bookParcelConstants";

// Components
import BookParcelHeader from "./components/BookParcelHeader";
import ProgressSteps from "./components/ProgressSteps";
import SenderForm from "./components/SenderForm";
import RecipientForm from "./components/RecipientForm";
import PackageForm from "./components/PackageForm";
import ServiceForm from "./components/ServiceForm";
import PriceSummary from "./components/PriceSummary";
import NavigationButtons from "./components/NavigationButtons";

function BookParcel() {
  const navigate = useNavigate();
  const {
    formData,
    currentStep,
    isSubmitting,
    handleInputChange,
    nextStep,
    prevStep,
    calculatePrice,
    handleSubmit,
  } = useBookParcelForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(navigate);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SenderForm formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <RecipientForm formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <PackageForm formData={formData} onInputChange={handleInputChange} packageTypes={PACKAGE_TYPES} />;
      case 4:
        return (
          <div className="space-y-6">
            <ServiceForm formData={formData} onInputChange={handleInputChange} serviceTypes={SERVICE_TYPES} />
            <PriceSummary formData={formData} serviceTypes={SERVICE_TYPES} calculatePrice={() => calculatePrice(SERVICE_TYPES)} />
          </div>
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

        <form onSubmit={onSubmit} className="space-y-6">
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
