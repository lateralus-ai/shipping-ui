import type { Meta, StoryObj } from "@storybook/react";
import { DocumentEditor } from "../components/DocumentEditor";
import type { Schema } from "../types/documentEditor";

// Sample schema based on the defect report form
const sampleSchema: Schema = {
  type: "object",
  properties: {
    shipName: {
      type: "string",
      description: "Name of the ship",
    },
    reportDate: {
      type: "string",
      format: "date",
      description: "Date of the report",
    },
    reportNo: {
      type: "string",
      description: "Report number",
    },
    malfunctionDateTime: {
      type: "string",
      format: "date",
      description: "Date the malfunction occurred",
    },
    malfunctionDescription: {
      type: "string",
      description: "Description of the malfunction or defect",
    },
    isCriticalEquipment: {
      type: "boolean",
      description: "Whether the equipment referenced is critical",
      docx_mapping: {
        type: "checkbox",
        true_name: "Check1",
        false_name: "Check2",
      },
    },
    equipmentManufacturer: {
      type: "string",
      description: "The malfunctioning equipment manufacturer",
    },
    equipmentModel: {
      type: "string",
      description: "The malfunctioning equipment model",
    },
    equipmentSerial: {
      type: "string",
      description: "The malfunctioning equipment serial number",
    },
    equipmentManufacturerModelSerial: {
      type: "string",
      description: "Manufacturer, model, type, and serial number",
    },
    consequences: {
      type: "string",
      description: "Consequences of the malfunction",
    },
    rootCause: {
      type: "string",
      description: "Root cause of the defect (if known)",
    },
    actionsTaken: {
      type: "string",
      description: "Actions taken or suggestions for corrective actions",
    },
    isShoreAssistanceRequired: {
      type: "boolean",
      description: "Whether shore assistance is required",
      docx_mapping: {
        type: "checkbox",
        true_name: "Check3",
        false_name: "Check4",
      },
    },
    shoreAssistanceRequisition: {
      type: "string",
      description: "Requisition details for shore assistance",
    },
    isEquipmentLandedAshore: {
      type: "boolean",
      description: "Whether equipment/machinery was landed ashore",
      docx_mapping: {
        type: "checkbox",
        true_name: "Check5",
        false_name: "Check6",
      },
    },
    equipmentLandedRequisition: {
      type: "string",
      description: "Requisition details for equipment landed ashore",
    },
    areSparesAvailableOnboard: {
      type: "boolean",
      description: "Whether required spare parts are available onboard",
      docx_mapping: {
        type: "checkbox",
        true_name: "Check7",
        false_name: "Check8",
      },
    },
    sparesAvailableRequisition: {
      type: "string",
      description: "Requisition details if spares are available onboard",
    },
    isNextDryDock: {
      type: "boolean",
      description: "If it's going to close out in next dry dock",
      docx_mapping: {
        type: "checkbox",
        true_name: "Check9",
        false_name: "Check10",
      },
    },
    proposedCompletionDate: {
      type: "string",
      format: "date",
      description: "Proposed date for completion",
    },
    chiefEngineerName: {
      type: "string",
      description: "Name of the Chief Engineer",
    },
    chiefEngineerSignature: {
      type: "string",
      description: "Signature of the Chief Engineer (surname only)",
    },
    chiefEngineerDate: {
      type: "string",
      format: "date",
      description: "Date signed by the Chief Engineer",
    },
    masterName: {
      type: "string",
      description: "Name of the Master",
    },
    masterSignature: {
      type: "string",
      description: "Signature of the Master (surname only)",
    },
    masterDate: {
      type: "string",
      format: "date",
      description: "Date signed by the Master",
    },
  },
  required: [],
};

// Sample initial data for demonstration
const sampleInitialData = {
  shipName: "MV Excellence",
  reportNo: "DR-2024-001",
  reportDate: "2024-03-15",
  malfunctionDateTime: "2024-03-14",
  malfunctionDescription:
    "Main engine turbocharger failure during normal operation",
  isCriticalEquipment: true,
  equipmentManufacturer: "ABB",
  equipmentModel: "TPL 85-B",
  equipmentSerial: "TC-12345-2020",
  consequences: "Reduced engine power, speed limited to 10 knots",
  rootCause: "Bearing failure due to inadequate lubrication",
  actionsTaken:
    "Turbocharger isolated, vessel proceeding at reduced speed to nearest port",
  isShoreAssistanceRequired: true,
  shoreAssistanceRequisition:
    "Service engineer required for turbocharger overhaul",
  isEquipmentLandedAshore: false,
  areSparesAvailableOnboard: false,
  isNextDryDock: false,
  proposedCompletionDate: "2024-03-20",
};

const DocumentEditorWrapper = () => {
  const handleDataChange = (data: Record<string, any>) => {
    console.log("Data changed:", data);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <DocumentEditor
        docxUrl="/sample-document.docx"
        schema={sampleSchema}
        onDataChange={handleDataChange}
        initialData={sampleInitialData}
        readonly={false}
      />
    </div>
  );
};

const meta = {
  title: "Components/DocumentEditor",
  component: DocumentEditorWrapper,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The DocumentEditor component provides an interactive Word document editor with inline field editing capabilities.

## Features
- Renders Word documents using docx-preview
- Supports inline editing with various field types (text, boolean, date, dropdown)
- Tracks field changes with visual color coding
- Handles checkbox patterns (single, dual Yes/No, radio buttons)
- Preserves document formatting and layout

## Usage
\`\`\`tsx
import { DocumentEditor } from '@lateralus-ai/shipping-ui';

<DocumentEditor
  docxUrl="/path/to/document.docx"
  schema={documentSchema}
  onDataChange={(data) => console.log(data)}
  initialData={initialValues}
  readonly={false}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    docxUrl: {
      control: "text",
      description: "URL to the DOCX document template",
    },
    readonly: {
      control: "boolean",
      description: "Whether the document is in read-only mode",
    },
  },
} satisfies Meta<typeof DocumentEditorWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <DocumentEditor
          docxUrl="/sample-document.docx"
          schema={sampleSchema}
          initialData={sampleInitialData}
          onDataChange={(data) => console.log(data)}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <DocumentEditor
          docxUrl="/sample-document.docx"
          schema={sampleSchema}
          initialData={sampleInitialData}
          readonly={true}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <DocumentEditor
          docxUrl="/sample-document.docx"
          schema={sampleSchema}
          initialData={{}}
          readonly={false}
          onDataChange={(data) => console.log(data)}
        />
      </div>
    );
  },
};
