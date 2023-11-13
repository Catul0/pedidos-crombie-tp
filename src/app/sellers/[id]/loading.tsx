import React from "react";
import Loader from "@/components/Spinner";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
