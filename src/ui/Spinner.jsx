// ui/Spinner.jsx
import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div
        className="w-20 aspect-square rounded-full animate-spin"
        style={{
          background:
            "radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #4f46e5)",
          WebkitMask:
            "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
        }}
      ></div>
    </div>
  );
}

export default Spinner;
