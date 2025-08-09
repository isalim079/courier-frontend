import { useState } from "react";
import {
  User,
  MapPin,
  Package,
  Calendar,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookParcel() {
  const navigate = useNavigate();
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

  const packageTypes = [
    "Documents",
    "Electronics",
    "Clothing",
    "Books",
    "Food Items",
    "Fragile Items",
    "Other",
  ];

  const serviceTypes = [
    { id: "standard", name: "Standard Delivery", time: "3-5 days", price: 15 },
    { id: "express", name: "Express Delivery", time: "1-2 days", price: 25 },
    { id: "overnight", name: "Overnight Delivery", time: "Next day", price: 40 },
  ];

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

  const calculatePrice = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/customer.dashboard");
      // You can add a success notification here
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: "Sender Info", icon: User },
    { number: 2, title: "Recipient Info", icon: MapPin },
    { number: 3, title: "Package Details", icon: Package },
    { number: 4, title: "Service & Payment", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/customer.dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book New Parcel</h1>
              <p className="text-gray-600 mt-1">
                Fill in the details to book your parcel delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <IconComponent className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      isActive
                        ? "text-green-700"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.number < steps.length && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Sender Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 text-green-600 mr-2" />
                Sender Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => handleInputChange("", "senderName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.senderPhone}
                    onChange={(e) => handleInputChange("", "senderPhone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => handleInputChange("", "senderEmail", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderCity}
                    onChange={(e) => handleInputChange("", "senderCity", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.senderAddress}
                    onChange={(e) => handleInputChange("", "senderAddress", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your complete address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderPincode}
                    onChange={(e) => handleInputChange("", "senderPincode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Recipient Information */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-green-600 mr-2" />
                Recipient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("", "recipientName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter recipient's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.recipientPhone}
                    onChange={(e) => handleInputChange("", "recipientPhone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter recipient's phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange("", "recipientEmail", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter recipient's email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientCity}
                    onChange={(e) => handleInputChange("", "recipientCity", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter recipient's city"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.recipientAddress}
                    onChange={(e) => handleInputChange("", "recipientAddress", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter recipient's complete address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientPincode}
                    onChange={(e) => handleInputChange("", "recipientPincode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Package Details */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 text-green-600 mr-2" />
                Package Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Type *
                  </label>
                  <select
                    required
                    value={formData.packageType}
                    onChange={(e) => handleInputChange("", "packageType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select package type</option>
                    {packageTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.weight}
                    onChange={(e) => handleInputChange("", "weight", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter weight in kg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={formData.dimensions.length}
                      onChange={(e) => handleInputChange("dimensions", "length", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Length"
                    />
                    <input
                      type="number"
                      value={formData.dimensions.width}
                      onChange={(e) => handleInputChange("dimensions", "width", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Width"
                    />
                    <input
                      type="number"
                      value={formData.dimensions.height}
                      onChange={(e) => handleInputChange("dimensions", "height", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Height"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Declared Value ($)
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange("", "value", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter package value"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange("", "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the contents of your package"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange("", "specialInstructions", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Any special handling instructions"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Service & Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Service Options
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Speed
                    </label>
                    <div className="space-y-2">
                      {serviceTypes.map((service) => (
                        <label key={service.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="serviceType"
                            value={service.id}
                            checked={formData.serviceType === service.id}
                            onChange={(e) => handleInputChange("", "serviceType", e.target.value)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{service.name}</span>
                              <span className="text-lg font-bold text-green-600">${service.price}</span>
                            </div>
                            <span className="text-sm text-gray-500">{service.time}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.pickupDate}
                        onChange={(e) => handleInputChange("", "pickupDate", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Time *
                      </label>
                      <select
                        required
                        value={formData.pickupTime}
                        onChange={(e) => handleInputChange("", "pickupTime", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select time</option>
                        <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
                        <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
                        <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.insurance}
                        onChange={(e) => handleInputChange("", "insurance", e.target.checked)}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Add insurance coverage (+1% of declared value, minimum $5)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.signatureRequired}
                        onChange={(e) => handleInputChange("", "signatureRequired", e.target.checked)}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Require signature on delivery
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Price Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base delivery cost:</span>
                    <span className="font-medium">${serviceTypes.find(s => s.id === formData.serviceType)?.price || 15}</span>
                  </div>
                  {parseFloat(formData.weight) > 5 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extra weight charge:</span>
                      <span className="font-medium">${((parseFloat(formData.weight) - 5) * 2).toFixed(2)}</span>
                    </div>
                  )}
                  {formData.insurance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium">${Math.max(5, (parseFloat(formData.value) || 0) * 0.01).toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>Total Amount:</span>
                    <span>${calculatePrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <span>Book Parcel</span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookParcel;
