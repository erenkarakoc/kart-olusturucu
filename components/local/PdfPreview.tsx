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
    <div className="flex gap-8">
      <div>
        <div className="w-[400px] h-[225px] overflow-hidden flex items-center justify-center shadow-xl">
          {kartvizitPdf ? (
            <Document file={kartvizitPdf} loading={<Skeleton className="w-full h-full" />}>
              <Page pageNumber={1} width={400} />
            </Document>
          ) : <Skeleton className="w-full h-full" />}
        </div>
      </div>
      <div>
        <div className="w-[375px] h-[525px] overflow-hidden flex items-center justify-center shadow-xl">
          {yakaKartiPdf ? (
            <Document file={yakaKartiPdf} loading={<Skeleton className="w-full h-full" />}>
              <Page pageNumber={1} width={375} />
            </Document>
          ) : <Skeleton className="w-full h-full" />}
        </div>
      </div>
    </div>
  );
}
