import { User, Phone, Mail, MapPin } from "lucide-react";

function ContactInformation({ trackingData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="h-5 w-5 text-green-600 mr-2" />
        Contact Information
      </h3>
      <div className="space-y-4">
        {/* Sender */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Sender:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {trackingData.sender.name}
            </p>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>{trackingData.sender.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>{trackingData.sender.email}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-3 w-3 mt-0.5" />
              <span>{trackingData.sender.address}</span>
            </div>
          </div>
        </div>

        {/* Recipient */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Recipient:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {trackingData.recipient.name}
            </p>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>{trackingData.recipient.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>{trackingData.recipient.email}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-3 w-3 mt-0.5" />
              <span>{trackingData.recipient.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
