import { CheckCircle } from "lucide-react";

function ProgressSteps({ steps, currentStep }) {
  return (
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
  );
}

export default ProgressSteps;
