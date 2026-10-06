import type { Meta, StoryObj } from "@storybook/react";
import { pdfjs } from "react-pdf";
import { PdfViewer } from "../../components";

// Storybook is the host app here, so it owns the worker (see PdfViewer.tsx).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type SamplePage = { width: number; height: number };

const samplePages: SamplePage[] = [
  { width: 612, height: 792 },
  { width: 792, height: 612 },
  { width: 612, height: 792 },
];

const pageContent = ({ width, height }: SamplePage, index: number) =>
  [
    "0.8 G 4 w 12 12 " + `${width - 24} ${height - 24} re S`,
    "BT /F1 18 Tf 36 " + `${height - 48} Td (TOP OF PAGE ${index + 1}) Tj ET`,
    `BT /F1 40 Tf 36 ${height / 2} Td (Page ${index + 1} of ${samplePages.length}) Tj ET`,
    `BT /F1 12 Tf 36 ${height / 2 - 32} Td (Selectable sample text for the PdfViewer story.) Tj ET`,
    "BT /F1 18 Tf 36 36 Td " + `(BOTTOM OF PAGE ${index + 1}) Tj ET`,
  ].join("\n");

// A tiny generated PDF, so the story needs no binary fixture in the repo.
const buildSamplePdf = () => {
  const pageIds = samplePages.map((_, index) => 4 + index * 2);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${samplePages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ...samplePages.flatMap((page, index) => {
      const content = pageContent(page, index);
      return [
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${pageIds[index] + 1} 0 R >>`,
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
      ];
    }),
  ];
  const header = "%PDF-1.4\n";
  const bodies = objects.map((body, index) => `${index + 1} 0 obj\n${body}\nendobj\n`);
  const offsets = bodies.reduce<number[]>(
    (acc, _, index) => [...acc, index === 0 ? header.length : acc[index - 1] + bodies[index - 1].length],
    [],
  );
  const xrefOffset = header.length + bodies.join("").length;
  const xref = [
    `xref\n0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
  ].join("\n");
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  const pdf = `${header}${bodies.join("")}${xref}\n${trailer}`;
  return URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
};

const sampleSrc = buildSamplePdf();

const meta: Meta<typeof PdfViewer> = {
  title: "Components/PdfViewer",
  component: PdfViewer,
  parameters: { layout: "fullscreen" },
  args: { src: sampleSrc, title: "Sample.pdf", onClose: () => {} },
  render: (args) => (
    <div className="h-screen w-full">
      <PdfViewer {...args} />
    </div>
  ),
};
export default meta;

type Story = StoryObj<typeof PdfViewer>;
export const Default: Story = {};
export const InitialPage: Story = { args: { initialPage: 2 } };
