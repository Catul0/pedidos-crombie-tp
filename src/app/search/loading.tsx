import React from "react";
import Spinner from "@/components/Spinner";
function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;
