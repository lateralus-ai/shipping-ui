import React from "react";

export const Typography = () => {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Typography Styles</h2>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Subheader</p>
            <p className="text-subheader">This is subheader text (18px/28px)</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Subheader Emphasized
            </p>
            <p className="text-subheader-em">
              This is emphasized subheader text (18px/28px, 500 weight)
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Body</p>
            <p className="text-body">This is body text (16px/28px)</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Body Emphasized</p>
            <p className="text-body-em">
              This is emphasized body text (16px/28px, 500 weight)
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Caption 1</p>
            <p className="text-caption-1">This is caption-1 text (16px/22px)</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Caption 1 Emphasized
            </p>
            <p className="text-caption-1-em">
              This is emphasized caption-1 text (16px/22px, 500 weight)
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Caption 2</p>
            <p className="text-caption-2">This is caption-2 text (14px/20px)</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Caption 2 Emphasized
            </p>
            <p className="text-caption-2-em">
              This is emphasized caption-2 text (14px/20px, 500 weight)
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">Footnote</p>
            <p className="text-footnote">This is footnote text (13px/17px)</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Footnote Emphasized
            </p>
            <p className="text-footnote-em">
              This is emphasized footnote text (13px/17px, 500 weight)
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Font Families</h2>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Sans (Work Sans)
            </p>
            <p className="font-sans text-body">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Mono (Roboto Mono)
            </p>
            <p className="font-mono text-body">const code = "Hello, World!";</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-caption-2 text-gray-500 mb-1">
              Signature (Cursive)
            </p>
            <p className="font-signature text-body">John Doe</p>
          </div>
        </div>
      </section>
    </div>
  );
};
