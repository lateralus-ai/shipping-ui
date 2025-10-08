// Type definitions for Document Editor components

export interface SchemaProperty {
  type: "string" | "boolean" | "number" | "integer";
  enum?: string[];
  format?: "date" | "date-time" | string;
  description?: string;
  title?: string;
  "ui:widget"?: string;
  "ui:rows"?: number;
  docx_mapping?: DocxMapping;
}

export interface DocxMapping {
  type: "checkbox" | "radio" | "text";
  name?: string;
  true_name?: string;
  false_name?: string;
  mapping?: RadioMapping[];
}

export interface RadioMapping {
  name: string;
  value: string | boolean;
}

export interface Schema {
  type: string;
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

export interface CheckboxModuleOptions {
  checkboxData?: Record<string, boolean>;
  schema?: Schema;
  finalGeneration?: boolean;
}

export interface DocumentEditorProps {
  docxUrl: string;
  schema: Schema;
  onDataChange?: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  onSaveRef?: React.MutableRefObject<(() => void) | null>;
  readonly?: boolean;
}

export interface DocxtemplaterPart {
  value?: string;
  [key: string]: any;
}

export interface DocxtemplaterOptions {
  contentType?: string;
  [key: string]: any;
}