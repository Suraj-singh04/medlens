import { useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfPreview({ url }) {
  const canvasRef = useRef();

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 }); // Higher scale for better quality

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (error) {
        console.error("Error loading or rendering PDF:", error);
        // Optionally, show an error message on the canvas or UI
      }
    };

    renderPDF();
  }, [url]);

  return (
    <div className="flex justify-center items-center bg-gray-100 h-48 overflow-auto">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default PdfPreview;
