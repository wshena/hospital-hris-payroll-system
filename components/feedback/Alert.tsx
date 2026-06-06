import { AlertType } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XCircleIcon,
} from "lucide-react";

interface AlertProps {
  title: string;
  description: string;
  type: AlertType;
}

const getAlertTypeIcon = (type: AlertType) => {
  switch (type) {
    case "success":
      return <CheckCircle2Icon className="text-green-500" />;
    case "error":
      return <XCircleIcon className="text-red-500" />;
    case "warning":
      return <AlertTriangleIcon className="text-yellow-500" />;
    case "info":
      return <InfoIcon className="text-blue-500" />;
    default:
      return null;
  }
};

const CustomAlert = ({ title, description, type }: AlertProps) => {
  return (
    <div className="absolute top-5 right5 z-50">
      <Alert>
        {getAlertTypeIcon(type)}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};

export default CustomAlert;
