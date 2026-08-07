export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "date" | "time" | "number";

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  min?: string | number;
  max?: string | number;
  step?: string | number;
};

export type FormSchema = {
  id: string;
  name: string;
  submitLabel?: string;
  fields: FormField[];
};
