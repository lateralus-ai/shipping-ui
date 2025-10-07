import type {
  CheckboxModuleOptions,
  Schema,
  DocxtemplaterPart,
  DocxtemplaterOptions,
} from "../types/documentEditor";

/**
 * CheckboxModule for docxtemplater
 *
 * This module handles three distinct checkbox patterns in DOCX documents:
 *
 * 1. **Single Checkbox Pattern**: A field maps to a single checkbox
 *    - Schema: `docx_mapping: { type: "checkbox", name: "Check1" }`
 *    - Maps boolean field value directly to checkbox state
 *
 * 2. **Dual Checkbox Pattern**: Yes/No checkboxes for a single field
 *    - Schema: `docx_mapping: { type: "checkbox", true_name: "Check1", false_name: "Check2" }`
 *    - true_name checkbox checked when field is true
 *    - false_name checkbox checked when field is false
 *    - Used for Yes/No questions where both options have checkboxes
 *
 * 3. **Radio Button Pattern**: Multiple checkboxes acting as radio buttons
 *    - Schema: `docx_mapping: { type: "radio", mapping: [{ name: "Check1", value: "option1" }, ...] }`
 *    - Only the checkbox corresponding to the field's value is checked
 *    - Used for multiple choice questions
 *
 * The module operates in two modes:
 * - **Preview Mode** (finalGeneration: false): Creates visual markers for inline editing
 * - **Final Generation Mode** (finalGeneration: true): Updates actual Word form fields
 */
class CheckboxModule {
  private checkboxData: Record<string, boolean>;
  private schema?: Schema;
  private finalGeneration: boolean;

  constructor(options: CheckboxModuleOptions = {}) {
    this.checkboxData = options.checkboxData || {};
    this.schema = options.schema;
    this.finalGeneration = options.finalGeneration || false;
  }

  // Required docxtemplater module interface
  name = "CheckboxModule";

  parse(placeHolderContent: string) {
    // Return null to indicate this module doesn't handle this placeholder
    // This allows other modules/default processing to handle it
    return null;
  }

  postparse(parsed: any) {
    return parsed;
  }

  render(part: any, options: any) {
    return part;
  }

  postrender(parts: DocxtemplaterPart[], options: DocxtemplaterOptions) {
    const hasValidOptions = !!(
      options &&
      options.contentType &&
      options.contentType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
    );

    return !hasValidOptions ? parts : (() => {
      try {
        // Convert parts to string for processing
        const xmlContent = parts
          .map((part) => {
            const isString = typeof part === "string";
            const hasValue = part && typeof part === "object" && part.value;

            const getString = () => isString && part;
            const getValue = () => !isString && hasValue && part.value;
            const getStringified = () => !isString && !hasValue && String(part);

            return getString() || getValue() || getStringified();
          })
          .join("");

        // Process checkbox patterns
        const processedContent = this.processCheckboxPatterns(xmlContent);

        // Return the processed content maintaining the same structure as input
        return [processedContent];
      } catch (error) {
        // Return original parts if processing fails
        return parts;
      }
    })();
  }

  /**
   * Process checkbox patterns in the document XML
   * Identifies Word form field checkboxes by their bookmark names (Check1, Check2, etc.)
   * and either updates their values or replaces them with visual markers
   */
  private processCheckboxPatterns(xmlContent: string): string {
    try {
      // Pattern 1: Simple checkbox bookmarks (most conservative approach)
      // Matches: <w:bookmarkStart w:name="Check1" w:id="0"/>
      const simpleBookmarkRegex =
        /<w:bookmarkStart[^>]*w:name="(Check\d+)"[^>]*\/>/gi;

      // Reset regex
      simpleBookmarkRegex.lastIndex = 0;

      const checkboxMatches: string[] = [];
      let match;
      while ((match = simpleBookmarkRegex.exec(xmlContent)) !== null) {
        checkboxMatches.push(match[1]);
      }

      // Only process if we found actual checkbox bookmarks
      const hasCheckboxMatches = checkboxMatches.length > 0;

      return !hasCheckboxMatches ? xmlContent : (() => {
        const processForFinalGeneration = () => {
          // For final generation, update the checkbox default values directly in the XML
          checkboxMatches.forEach((checkboxName) => {
            const isChecked = this.getCheckboxState(checkboxName);
            const checkedValue = isChecked ? "1" : "0";

            // Update the default value in the checkbox XML
            const checkboxRegex = new RegExp(
              `(<w:fldChar w:fldCharType="begin">.*?<w:name w:val="${checkboxName}".*?<w:default w:val=")([01])(".*?</w:fldChar>)`,
              "gs",
            );

            xmlContent = xmlContent.replace(checkboxRegex, `$1${checkedValue}$3`);
          });
          return xmlContent;
        };

        const processForPreview = () => {
          // For preview mode, create visual markers
          // Reset regex for replacement
          simpleBookmarkRegex.lastIndex = 0;

          return xmlContent.replace(
            simpleBookmarkRegex,
            (match, checkboxName) => {
              try {
                const isChecked = this.getCheckboxState(checkboxName);
                const symbol = isChecked ? "☑" : "☐";
                const marker = `|||${symbol}|||checkbox:${checkboxName}|||`;

                // Replace just the bookmark start with our marker in a text run
                return `<w:r><w:t>${marker}</w:t></w:r><w:bookmarkStart w:name="${checkboxName}" w:id="0"/>`;
              } catch (error) {
                // Return original if processing fails
                return match;
              }
            },
          );
        };

        const renderFinalGeneration = () => this.finalGeneration && processForFinalGeneration();
        const renderPreview = () => !this.finalGeneration && processForPreview();

        return renderFinalGeneration() || renderPreview();
      })();
    } catch (error) {
      // Return original content if processing fails
      return xmlContent;
    }
  }

  /**
   * Determine the state of a checkbox based on field mappings and data
   * @param checkboxName - The name of the checkbox (e.g., "Check1")
   * @returns true if checkbox should be checked, false otherwise
   */
  private getCheckboxState(checkboxName: string): boolean {
    const hasSchema = !!this.schema;

    const getSimpleLookup = () => !hasSchema && (this.checkboxData[checkboxName] || false);
    const getSchemaBasedLookup = () => hasSchema && (() => {
          // Check all fields in the schema for checkbox mappings
          const matchedField = Object.entries(
            this.schema!.properties || {},
          ).find(([fieldName, fieldConfig]) => {
            const config = fieldConfig as any;
            const docxMapping = config.docx_mapping;
            const hasCheckboxMapping = docxMapping && docxMapping.type === "checkbox";
            const hasRadioMapping = docxMapping && docxMapping.type === "radio" && docxMapping.mapping;

            // Pattern 1: Single checkbox with "name" property
            const isSingleCheckbox = hasCheckboxMapping && docxMapping.name === checkboxName;

            // Pattern 2: Dual checkbox with "true_name" and "false_name" properties
            const isTrueCheckbox = hasCheckboxMapping && docxMapping.true_name === checkboxName;
            const isFalseCheckbox = hasCheckboxMapping && docxMapping.false_name === checkboxName;

            // Pattern 3: Radio button mapping
            const radioMapping = hasRadioMapping && docxMapping.mapping.find(
              (m: any) => m.name === checkboxName,
            );

            return isSingleCheckbox || isTrueCheckbox || isFalseCheckbox || !!radioMapping;
          });

          return matchedField ? (() => {
            const [fieldName, fieldConfig] = matchedField;
            const config = fieldConfig as any;
            const docxMapping = config.docx_mapping;

            // Pattern 1: Single checkbox with "name" property
            const isSingleCheckbox = docxMapping && docxMapping.type === "checkbox" && docxMapping.name === checkboxName;

            // Pattern 2: Dual checkbox with "true_name" and "false_name" properties
            const isTrueCheckbox = docxMapping && docxMapping.type === "checkbox" && docxMapping.true_name === checkboxName;
            const isFalseCheckbox = docxMapping && docxMapping.type === "checkbox" && docxMapping.false_name === checkboxName;

            // Pattern 3: Radio button mapping
            const radioMapping = docxMapping && docxMapping.type === "radio" && docxMapping.mapping &&
                                docxMapping.mapping.find((m: any) => m.name === checkboxName);

            const checkSingleOrTrue = () => (isSingleCheckbox || isTrueCheckbox) && this.checkboxData[fieldName] === true;
            const checkFalse = () => isFalseCheckbox && this.checkboxData[fieldName] === false;
            const checkRadio = () => radioMapping && this.checkboxData[fieldName] === radioMapping.value;

            return checkSingleOrTrue() || checkFalse() || checkRadio() || false;
          })() : (this.checkboxData[checkboxName] || false);
        })();

    return getSimpleLookup() || getSchemaBasedLookup() || false;
  }

  /**
   * Update checkbox data (can be called to change checkbox states)
   * @param checkboxData - New checkbox data to merge with existing data
   */
  updateCheckboxData(checkboxData: Record<string, boolean>) {
    this.checkboxData = { ...this.checkboxData, ...checkboxData };
  }
}

export default CheckboxModule;