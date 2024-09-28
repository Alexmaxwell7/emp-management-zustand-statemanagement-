export interface FormValues {
    name: string;
    email: string;
    employeeId: string;
    mobileNumber: string;
    role: string;
  }
  
  export interface FormFieldProps {
    id?: string;
    onClose?: (() => void | undefined) | undefined;
  }
  
  export interface FormDetails {
    name: string;
    email: string;
    employeeId: string;
    mobileNumber: string;
    JobRole: string;
  }

  export interface InputFieldProps {
    label?: string;
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: any;
    className?: string;
    icon?: React.ReactNode;
  }
  