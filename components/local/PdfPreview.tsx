'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default function PdfPreview({ kartvizitPdf, yakaKartiPdf }) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full h-full">
      <div className="w-full xl:flex-1 flex">
        <div className="w-full max-w-[600px] aspect-[9.4/5.6] overflow-hidden shadow-xl">
          {kartvizitPdf ? (
            <Document file={kartvizitPdf} loading={<Skeleton className="w-full h-full" />}>
              <Page pageNumber={1} width={600} className="max-w-full h-auto" />
            </Document>
          ) : <Skeleton className="w-full h-full" />}
        </div>
      </div>
      <div className="w-full xl:w-auto xl:h-full">
        <div className="w-full max-w-[450px] xl:max-w-none xl:w-auto xl:h-[calc(100vh-8rem)] aspect-[7.5/10.5] overflow-hidden flex justify-center shadow-xl">
          {yakaKartiPdf ? (
            <Document file={yakaKartiPdf} loading={<Skeleton className="w-full h-full" />}>
              <Page pageNumber={1} height={typeof window !== 'undefined' ? Math.min(window.innerHeight - 128, 700) : 700} className="max-w-full h-auto" />
            </Document>
          ) : <Skeleton className="w-full h-full" />}
        </div>
      </div>
    </div>
  );
}
