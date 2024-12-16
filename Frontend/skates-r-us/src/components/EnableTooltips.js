import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tooltip from "bootstrap/js/dist/tooltip"; // Import Tooltip specifically

function EnableTooltips() {
  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new Tooltip(tooltipTriggerEl); // Use the imported Tooltip directly
    });
  }, []);

  return null; // This component just initializes tooltips
}

export default EnableTooltips;
