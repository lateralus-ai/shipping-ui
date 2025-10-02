import React from "react";

const colorGroups = {
  Gray: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  Green: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  Blue: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  Red: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  Orange: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
};

export const ColorPalette = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Color Palette</h2>

      {Object.entries(colorGroups).map(([colorName, shades]) => (
        <div key={colorName}>
          <h3 className="text-lg font-semibold mb-4">{colorName}</h3>
          <div className="grid grid-cols-10 gap-2">
            {shades.map((shade) => {
              const colorClass = `bg-${colorName.toLowerCase()}-${shade}`;
              return (
                <div key={shade} className="text-center">
                  <div
                    className={`${colorClass} h-20 rounded-md border border-gray-200`}
                  />
                  <p className="text-xs mt-1">{shade}</p>
                  <p className="text-xs text-gray-500">
                    {colorName.toLowerCase()}-{shade}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <h3 className="text-lg font-semibold mb-4">Special Colors</h3>
        <div className="grid grid-cols-6 gap-4">
          <div className="text-center">
            <div className="bg-brand-purple h-20 rounded-md border border-gray-200" />
            <p className="text-xs mt-1">Brand Purple</p>
            <p className="text-xs text-gray-500">#ab68ff</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">CSS Variables</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-surface-primary h-20 rounded-md border border-gray-200" />
            <p className="text-xs mt-1">Surface Primary</p>
          </div>
          <div className="text-center">
            <div className="bg-surface-secondary h-20 rounded-md border border-gray-200" />
            <p className="text-xs mt-1">Surface Secondary</p>
          </div>
          <div className="text-center">
            <div className="bg-surface-tertiary h-20 rounded-md border border-gray-200" />
            <p className="text-xs mt-1">Surface Tertiary</p>
          </div>
          <div className="text-center">
            <div className="bg-surface-submit h-20 rounded-md border border-gray-200" />
            <p className="text-xs mt-1">Surface Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
