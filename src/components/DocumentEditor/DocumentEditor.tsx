import React, { useState, useEffect, useCallback, useRef } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import * as docxPreview from "docx-preview";
import CheckboxModule from "../../utils/checkboxModule";
import type {
  DocumentEditorProps,
  Schema,
  SchemaProperty,
} from "../../types/documentEditor";

// Store form data outside of React state to prevent rerenders
let globalFormData: Record<string, any> = {};
let originalData: Record<string, any> = {};

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  docxUrl,
  schema,
  onDataChange,
  initialData,
  onSaveRef,
  readonly = false,
}) => {
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveFlag, setSaveFlag] = useState(0); // Used to trigger saves
  const previewRef = useRef<HTMLDivElement>(null);

  const extractPlaceholders = useCallback((text: string): string[] => {
    const regex = /\{([^}]+)\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  }, []);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    // Update global form data without triggering React rerenders
    globalFormData = { ...globalFormData, [fieldName]: value };

    // Update color coding for this field
    updateFieldColor(fieldName, value);

    // Call onDataChange callback immediately on field change
    onDataChange?.(globalFormData);
  }, [onDataChange]);

  const handleCheckboxChange = useCallback(
    (checkboxName: string, checked: boolean) => {
      // Find the field name and update based on schema mapping
      const foundMapping = Object.entries(schema.properties || {}).find(([fieldName, fieldConfig]) => {
        const config = fieldConfig as SchemaProperty;
        const docxMapping = config.docx_mapping;

        // Pattern 1: Single checkbox with "name" property
        const isSingleCheckbox = docxMapping?.type === "checkbox" && docxMapping.name === checkboxName;
        isSingleCheckbox && handleFieldChange(fieldName, checked);

        // Pattern 2: Dual checkbox with "true_name" and "false_name" properties
        const isTrueCheckbox = docxMapping?.type === "checkbox" && docxMapping.true_name === checkboxName;
        const isFalseCheckbox = docxMapping?.type === "checkbox" && docxMapping.false_name === checkboxName;

        isTrueCheckbox && handleFieldChange(fieldName, checked);
        isFalseCheckbox && handleFieldChange(fieldName, !checked);

        // Pattern 3: Radio button mapping
        const radioMapping = docxMapping?.type === "radio" && docxMapping.mapping?.find(
          (m) => m.name === checkboxName,
        );
        radioMapping && handleFieldChange(fieldName, radioMapping.value);

        return isSingleCheckbox || isTrueCheckbox || isFalseCheckbox || !!radioMapping;
      });

      // Fallback to direct field name mapping
      !foundMapping && handleFieldChange(checkboxName, checked);
    },
    [handleFieldChange, schema],
  );

  const isFieldEdited = useCallback(
    (fieldName: string, value: any): boolean => {
      const originalValue = originalData[fieldName];

      // Handle different data types
      return !(value === originalValue ||
        (value === "" && (originalValue === null || originalValue === undefined)) ||
        (originalValue === "" && (value === null || value === undefined)));
    },
    [],
  );

  const updateFieldColor = useCallback(
    (fieldName: string, value: any) => {
      const hasPreviewRef = !!previewRef.current;
      const isEdited = isFieldEdited(fieldName, value);

      hasPreviewRef && (() => {
        const elements = previewRef.current!.querySelectorAll(
          `[data-field-path="${fieldName}"]`,
        );

        elements.forEach((element) => {
          const editedClass = isEdited ? "field-edited" : "field-original";
          const oppositeClass = isEdited ? "field-original" : "field-edited";

          element.classList.remove(oppositeClass);
          element.classList.add(editedClass);
        });
      })();
    },
    [isFieldEdited],
  );

  const updateAllFieldColors = useCallback(() => {
    const hasPreviewRef = !!previewRef.current;

    hasPreviewRef && (() => {
      Object.entries(globalFormData).forEach(([fieldName, value]) => {
        updateFieldColor(fieldName, value);
      });
    })();
  }, [updateFieldColor]);

  const handleSave = useCallback(async () => {
    // Only call onDataChange when user explicitly saves
    onDataChange?.(globalFormData);
    setSaveFlag((prev) => prev + 1);
  }, [onDataChange]);

  // Expose save function to parent component
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef.current = handleSave;
    }
  }, [handleSave, onSaveRef]);

  const processDocument = useCallback(
    async (data: Record<string, any>) => {
      try {
        const response = await fetch(docxUrl);
        const arrayBuffer = await response.arrayBuffer();

        const zip = new PizZip(arrayBuffer);

        // Create checkbox data from form data
        const checkboxData: Record<string, boolean> = {};
        Object.entries(data).forEach(([key, value]) => {
          if (
            typeof value === "boolean" ||
            value === "true" ||
            value === "false"
          ) {
            checkboxData[key] = value === true || value === "true";
          }
        });

        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          nullGetter: (e) => {
            const fieldPath = e.value || "unknown_field";
            return `||| |||${fieldPath}|||`;
          },
          modules: [
            new CheckboxModule({
              checkboxData,
              schema,
              finalGeneration: false,
            }),
          ],
        });

        // Create data with special markers for filled fields
        const markedData: Record<string, any> = {};
        const newlinePlaceholder = "__NEWLINE__";
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            let processedValue = value;
            if (typeof value === "string") {
              processedValue = value.replace(/\n/g, newlinePlaceholder);
            }
            // Generate marker for filled fields: |||value|||field_path|||
            markedData[key] = `|||${processedValue}|||${key}|||`;
          } else {
            // This will trigger nullGetter
            markedData[key] = null;
          }
        });

        // Render the document with the marked data
        doc.render(markedData);

        // Generate the document blob
        const generatedBlob = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        return generatedBlob;
      } catch (error) {
        console.error("Error processing document:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to process document",
        );
      }
    },
    [docxUrl, schema],
  );

  const createInlineInput = useCallback(
    (
      fieldPath: string,
      value: string,
      fieldConfig: SchemaProperty,
      data: Record<string, any>,
    ) => {
      const container = document.createElement("span");
      container.className = "inline-field-container";
      container.setAttribute("data-field-path", fieldPath);

      const isFieldReadOnly = readonly;
      const displayValue = value || globalFormData[fieldPath] || "";

      // Handle readonly mode
      const createReadonlyElement = () => {
        const isBooleanField = fieldConfig.type === "boolean";

        const element = isBooleanField ? (() => {
          const checkboxSymbol = document.createElement("span");
          checkboxSymbol.textContent =
            displayValue === "true" || globalFormData[fieldPath] === true
              ? "☑"
              : "☐";
          checkboxSymbol.className = "inline-checkbox-readonly";
          return checkboxSymbol;
        })() : (() => {
          const newlinePlaceholder = "__NEWLINE__";
          const restoredValue = String(displayValue).replace(
            new RegExp(newlinePlaceholder, "g"),
            "\n",
          );

          const textNode = document.createElement("span");
          textNode.textContent = restoredValue;
          textNode.className = "inline-field-readonly";
          textNode.style.whiteSpace = "pre-wrap";
          return textNode;
        })();

        container.appendChild(element);
        return container;
      };

      // Handle editable boolean fields
      const createBooleanInput = () => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked =
          value === "true" || globalFormData[fieldPath] === true;
        checkbox.className =
          "inline-checkbox rounded border-gray-300 text-green-600 focus:ring-green-500";
        checkbox.setAttribute("data-field-path", fieldPath);
        checkbox.addEventListener("change", (e) => {
          handleFieldChange(fieldPath, (e.target as HTMLInputElement).checked);
        });
        container.appendChild(checkbox);
        return container;
      };

      // Handle enum select fields
      const createSelectInput = () => {
        const select = document.createElement("select");
        select.className =
          "inline-select border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-500";
        select.setAttribute("data-field-path", fieldPath);

        // Add empty option
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Select...";
        select.appendChild(emptyOption);

        // Add enum options - sanitize option values
        fieldConfig.enum!.forEach((option) => {
          const optionEl = document.createElement("option");
          optionEl.value = String(option);
          optionEl.textContent = String(option);
          optionEl.selected = value === option || globalFormData[fieldPath] === option;
          select.appendChild(optionEl);
        });

        select.addEventListener("change", (e) => {
          handleFieldChange(fieldPath, (e.target as HTMLSelectElement).value);
        });
        container.appendChild(select);
        return container;
      };

      // Handle date input fields
      const createDateInput = () => {
        const input = document.createElement("input");
        input.type = fieldConfig.format === "date" ? "date" : "datetime-local";
        input.value = String(value || globalFormData[fieldPath] || "");
        input.className = "inline-date-input text-sm focus:outline-none";
        input.setAttribute("data-field-path", fieldPath);
        input.style.width = "100%";
        input.style.maxWidth = "200px";
        input.placeholder = String(fieldConfig.description || fieldPath);

        input.addEventListener("input", (e) => {
          handleFieldChange(fieldPath, (e.target as HTMLInputElement).value);
        });

        container.appendChild(input);
        return container;
      };

      // Handle text/textarea input fields
      const createTextInput = () => {
        const newlinePlaceholder = "__NEWLINE__";
        const restoredValue = String(
          value || globalFormData[fieldPath] || "",
        ).replace(new RegExp(newlinePlaceholder, "g"), "\n");

        const textarea = document.createElement("textarea");
        textarea.value = restoredValue;
        textarea.className =
          "inline-textarea text-sm focus:outline-none resize-none";
        textarea.setAttribute("data-field-path", fieldPath);
        textarea.style.width = "100%";
        textarea.style.minHeight = "17px";
        textarea.style.overflow = "hidden";
        textarea.placeholder = String(fieldConfig.description || fieldPath);
        textarea.rows = 1;

        // Auto-resize textarea
        const autoResize = () => {
          textarea.style.height = "auto";
          const shouldExpand = textarea.value.includes("\n") || textarea.scrollHeight > 25;
          textarea.style.height = shouldExpand
            ? Math.max(17, textarea.scrollHeight) + "px"
            : "17px";
        };

        textarea.addEventListener("input", (e) => {
          handleFieldChange(
            fieldPath,
            (e.target as HTMLTextAreaElement).value,
          );
          autoResize();
        });

        // Initial resize
        setTimeout(autoResize, 0);

        container.appendChild(textarea);
        return container;
      };

      // Main logic using separate conditionals
      const renderReadonly = () => isFieldReadOnly && createReadonlyElement();
      const renderBoolean = () => !isFieldReadOnly && fieldConfig.type === "boolean" && createBooleanInput();
      const renderSelect = () => !isFieldReadOnly && fieldConfig.enum && createSelectInput();
      const renderDate = () => !isFieldReadOnly && (fieldConfig.format === "date" || fieldConfig.format === "date-time") && createDateInput();
      const renderText = () => !isFieldReadOnly && fieldConfig.type !== "boolean" && !fieldConfig.enum && !(fieldConfig.format === "date" || fieldConfig.format === "date-time") && createTextInput();

      return renderReadonly() || renderBoolean() || renderSelect() || renderDate() || createTextInput();
    },
    [handleFieldChange, readonly],
  );

  const replaceMarkersWithInputs = useCallback(
    (container: HTMLElement, data: Record<string, any>) => {
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      );

      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const hasTextContent = !!textNode.textContent;
        const markerRegex = /\|\|\|([^|]*)\|\|\|([^|]+)\|\|\|/g;
        const text = textNode.textContent || "";
        const hasMarkers = markerRegex.test(text);
        const parent = textNode.parentNode;

        hasTextContent && hasMarkers && parent && (() => {
          // Split the text content and replace markers
          let lastIndex = 0;
          const fragment = document.createDocumentFragment();

          textNode.textContent!.replace(
            markerRegex,
            (match, value, fieldPath, offset) => {
              // Add text before the marker
              (offset > lastIndex) && fragment.appendChild(
                document.createTextNode(text.slice(lastIndex, offset)),
              );

              const isCheckboxMarker = fieldPath.startsWith("checkbox:");

              // Handle checkbox markers
              const createCheckboxElement = () => {
                const checkboxName = fieldPath.replace("checkbox:", "");

                // Find radio button configuration
                const radioConfig = Object.entries(schema.properties || {}).find(([fname, fieldConfig]) => {
                  const config = fieldConfig as SchemaProperty;
                  const docxMapping = config.docx_mapping;
                  const isDualCheckbox = docxMapping?.type === "checkbox" &&
                                       docxMapping.true_name &&
                                       docxMapping.false_name;

                  return isDualCheckbox &&
                         (docxMapping.true_name === checkboxName || docxMapping.false_name === checkboxName);
                });

                const [fieldName, fieldConfig] = radioConfig || [];
                const config = fieldConfig as SchemaProperty;
                const docxMapping = config?.docx_mapping;
                const isRadioButton = !!radioConfig;
                const isYesOption = docxMapping?.true_name === checkboxName;

                // Create readonly checkbox symbol
                const createReadonlyCheckbox = () => {
                  const checkboxSymbol = document.createElement("span");
                  checkboxSymbol.textContent = value;
                  checkboxSymbol.className = "inline-checkbox-readonly";
                  return checkboxSymbol;
                };

                // Create radio button
                const createRadioButton = () => {
                  const radioContainer = document.createElement("span");
                  radioContainer.className = "inline-radio-container";

                  const radio = document.createElement("input");
                  radio.type = "radio";
                  radio.name = `radio-group-${fieldName}`;
                  radio.value = isYesOption ? "true" : "false";

                  const currentValue = data[fieldName!];
                  radio.checked = isYesOption
                    ? (currentValue === true || currentValue === "true")
                    : (currentValue === false || currentValue === "false");

                  radio.className = "text-green-600 focus:ring-green-500 border-gray-300";
                  radio.setAttribute("data-field-path", checkboxName);
                  radio.addEventListener("change", (e) => {
                    const isChecked = (e.target as HTMLInputElement).checked;
                    isChecked && handleCheckboxChange(checkboxName, true);
                  });

                  radioContainer.appendChild(radio);
                  return radioContainer;
                };

                // Create regular checkbox
                const createRegularCheckbox = () => {
                  const checkbox = document.createElement("input");
                  checkbox.type = "checkbox";
                  checkbox.checked = value === "☑";
                  checkbox.className =
                    "inline-checkbox rounded border-gray-300 text-green-600 focus:ring-green-500";
                  checkbox.setAttribute("data-field-path", checkboxName);
                  checkbox.addEventListener("change", (e) => {
                    handleCheckboxChange(
                      checkboxName,
                      (e.target as HTMLInputElement).checked,
                    );
                  });
                  return checkbox;
                };

                const renderReadonlyCheckbox = () => readonly && createReadonlyCheckbox();
                const renderRadioButton = () => !readonly && isRadioButton && createRadioButton();
                const renderRegularCheckbox = () => !readonly && !isRadioButton && createRegularCheckbox();

                return renderReadonlyCheckbox() || renderRadioButton() || renderRegularCheckbox();
              };

              // Handle regular input elements
              const createRegularInput = () => {
                const fieldConfig = schema.properties?.[fieldPath] || {};
                return createInlineInput(fieldPath, value, fieldConfig, data);
              };

              const element = isCheckboxMarker
                ? createCheckboxElement()
                : createRegularInput();

              fragment.appendChild(element);
              lastIndex = offset + match.length;
              return match;
            },
          );

          // Add remaining text after the last marker
          (lastIndex < text.length) && fragment.appendChild(
            document.createTextNode(text.slice(lastIndex)),
          );

          parent.replaceChild(fragment, textNode);
        })();
      });
    },
    [schema, createInlineInput, handleCheckboxChange, readonly],
  );

  const updatePreview = useCallback(
    async (data: Record<string, any>) => {
      const hasPreviewRef = !!previewRef.current;

      hasPreviewRef && await (async () => {
        try {
          const blob = await processDocument(data);

          // Clear container and render preview using the npm package
          while (previewRef.current!.firstChild) {
            previewRef.current!.removeChild(previewRef.current!.firstChild);
          }
          await docxPreview.renderAsync(blob, previewRef.current!, undefined, {
            className: "docx-preview",
            inWrapper: true,
            hideWrapperOnPrint: true,
            ignoreWidth: false,
            ignoreHeight: false,
            ignoreFonts: false,
            breakPages: true,
            debug: false,
            experimental: true,
            trimXmlDeclaration: true,
            renderHeaders: false,
            renderFooters: false,
            renderFootnotes: true,
            renderEndnotes: true,
            ignoreLastRenderedPageBreak: true,
            useBase64URL: false,
            renderChanges: false,
            renderComments: false,
          });

          // Replace markers with input fields after rendering
          setTimeout(() => {
            const stillHasPreviewRef = !!previewRef.current;
            stillHasPreviewRef && (() => {
              replaceMarkersWithInputs(previewRef.current!, data);
              // Initialize field colors after inputs are created
              updateAllFieldColors();
            })();
          }, 100); // Small delay to ensure DOM is ready
        } catch (error) {
          console.error("Error updating preview:", error);
          const stillHasPreviewRef = !!previewRef.current;

          stillHasPreviewRef && (() => {
            // Clear existing content safely
            while (previewRef.current!.firstChild) {
              previewRef.current!.removeChild(previewRef.current!.firstChild);
            }
            // Create error message element safely
            const errorDiv = document.createElement("div");
            errorDiv.className = "p-4 text-red-600";
            errorDiv.textContent = `Error updating preview: ${error instanceof Error ? error.message : "Unknown error"}`;
            previewRef.current!.appendChild(errorDiv);
          })();
        }
      })();
    },
    [processDocument, replaceMarkersWithInputs, updateAllFieldColors],
  );

  const loadDocx = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(docxUrl);
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);

      // Extract placeholders from the document text
      const text = doc.getFullText();
      const extractedPlaceholders = extractPlaceholders(text);
      setPlaceholders(extractedPlaceholders);

      // Initialize form data with defaults, merging with provided initialData
      const defaultData: Record<string, any> = {};
      extractedPlaceholders.forEach((placeholder) => {
        const fieldConfig = schema.properties?.[placeholder];
        const hasFieldConfig = !!fieldConfig;

        const setBooleanDefault = () => hasFieldConfig && fieldConfig.type === "boolean" && false;
        const setDateDefault = () => hasFieldConfig && fieldConfig.type === "string" && fieldConfig.format === "date" && "";
        const setStringDefault = () => hasFieldConfig && fieldConfig.type !== "boolean" && !(fieldConfig.type === "string" && fieldConfig.format === "date") && "";
        const setEmptyDefault = () => !hasFieldConfig && "";

        defaultData[placeholder] = setBooleanDefault() || setDateDefault() || setStringDefault() || "";
      });

      // Merge default data with provided initial data
      const mergedData = { ...defaultData, ...initialData };
      globalFormData = mergedData;
      originalData = { ...mergedData }; // Store original data for comparison
      setError(null);
    } catch (err) {
      setError(
        `Failed to load document: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  }, [docxUrl, schema, extractPlaceholders, initialData]);

  useEffect(() => {
    loadDocx();
  }, [loadDocx]);

  // Generate initial preview after component mounts and data is loaded
  useEffect(() => {
    const shouldUpdatePreview = !loading &&
                                Object.keys(globalFormData).length > 0 &&
                                !!previewRef.current;

    shouldUpdatePreview && updatePreview(globalFormData);
  }, [loading, updatePreview]);

  // Update preview when save is triggered
  useEffect(() => {
    const shouldUpdate = saveFlag > 0 && !!previewRef.current;
    shouldUpdate && updatePreview(globalFormData);
  }, [saveFlag, updatePreview]);

  // Early return components
  const LoadingComponent = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-body">Loading document...</div>
    </div>
  );

  const ErrorComponent = () => (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="text-red-800 text-body-em">Error</div>
      <div className="text-red-700 text-body mt-1">{error}</div>
    </div>
  );

  // Return early states using separate conditionals
  const isLoading = loading;
  const hasError = !loading && !!error;

  const renderLoading = () => isLoading && <LoadingComponent />;
  const renderError = () => hasError && <ErrorComponent />;
  const renderDocument = () => !isLoading && !hasError && (
    <div>
      <style>{`
        .inline-field-container {
          display: block;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        .inline-input, .inline-select {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 13px;
          line-height: 1.4;
          font-family: inherit;
          height: 17px;
        }
        .inline-input:focus, .inline-select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        .inline-textarea {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 2px 4px;
          font-size: 13px;
          line-height: 1.4;
          font-family: inherit;
          overflow: hidden;
          word-wrap: break-word;
          display: inline-block;
          vertical-align: top;
        }
        .inline-textarea:focus {
          outline: none;
          background: transparent;
        }
        .inline-textarea:hover {
          background: rgba(0, 0, 0, 0.02);
        }
        .inline-date-input {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 2px 4px;
          font-size: 13px;
          line-height: 1.4;
          font-family: inherit;
          color: inherit;
          height: 17px;
        }
        .inline-date-input:focus {
          outline: none;
          background: transparent;
        }
        .inline-date-input:hover {
          background: rgba(0, 0, 0, 0.02);
        }
        /* Style the date picker icon */
        .inline-date-input::-webkit-calendar-picker-indicator {
          opacity: 0.6;
          cursor: pointer;
        }
        .inline-date-input::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        .inline-checkbox {
          margin: 0 4px;
          transform: scale(0.9);
        }
        /* Original field styles */
        .field-original {
          background: rgba(229, 231, 235, 0.3) !important;
        }
        .field-original:focus {
          background: rgba(229, 231, 235, 0.4) !important;
        }
        /* Edited field styles */
        .field-edited {
          background: rgba(254, 240, 138, 0.4) !important;
        }
        .field-edited:focus {
          background: rgba(254, 240, 138, 0.5) !important;
        }
        /* Textarea color coding */
        .inline-textarea.field-original {
          background: rgba(229, 231, 235, 0.2) !important;
          border-radius: 3px !important;
        }
        .inline-textarea.field-edited {
          background: rgba(254, 240, 138, 0.3) !important;
          border-radius: 3px !important;
        }
        /* Date input color coding */
        .inline-date-input.field-original {
          background: rgba(229, 231, 235, 0.2) !important;
          border-radius: 3px !important;
        }
        .inline-date-input.field-edited {
          background: rgba(254, 240, 138, 0.3) !important;
          border-radius: 3px !important;
        }
        /* Checkbox color coding */
        .inline-checkbox.field-original {
          accent-color: #9ca3af;
        }
        .inline-checkbox.field-edited {
          accent-color: #f59e0b;
        }
        .docx-preview .inline-field-container {
          background: rgba(255, 247, 230, 0.5);
          border-radius: 3px;
          padding: 1px 2px;
        }
        /* Readonly containers should be transparent */
        .docx-preview .inline-field-container:has(.inline-field-readonly),
        .docx-preview .inline-field-container:has(.inline-checkbox-readonly) {
          background: transparent !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        /* Container color coding */
        .docx-preview .inline-field-container.field-original {
          background: rgba(229, 231, 235, 0.3) !important;
        }
        .docx-preview .inline-field-container.field-edited {
          background: rgba(254, 240, 138, 0.4) !important;
        }
        /* Readonly mode: remove all background colors */
        .docx-preview .inline-field-container.field-original:has(.inline-field-readonly) {
          background: transparent !important;
        }
        .docx-preview .inline-field-container.field-edited:has(.inline-field-readonly) {
          background: transparent !important;
        }
        /* Remove header/footer padding from docx-preview */
        .docx-preview .docx-wrapper .docx-document {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        .docx-preview .docx-wrapper section {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        .docx-preview .docx-wrapper .docx-page {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        /* Override inline padding styles on section elements */
        section.docx-preview {
          padding-top: 20pt !important;
          padding-bottom: 20pt !important;
        }
        /* Override docx-preview-wrapper styles */
        .docx-preview-wrapper {
          background: transparent !important;
          padding: 0 !important;
        }
        .docx-preview-wrapper>section.docx-preview {
          margin-bottom: 0 !important;
          box-shadow: none !important;
        }
        /* Scale down all text in the document by 20% */
        .docx-preview {
          font-size: 80% !important;
        }
        @media (max-width: 1024px) {
          .docx-preview {
            width: auto !important;
          }
        }
        .docx-preview * {
          font-size: inherit !important;
        }
        /* Readonly field styles */
        .inline-field-readonly {
          color: inherit;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
          background: transparent;
          border-radius: 0;
          padding: 2px 4px;
          border: none;
        }
        .inline-checkbox-readonly {
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          margin: 0 2px;
        }
      `}</style>

      <div className="bg-white max-w-full">
        <div ref={previewRef} className="bg-white" />
      </div>
    </div>
  );

  return renderLoading() || renderError() || renderDocument();
};

export default DocumentEditor;