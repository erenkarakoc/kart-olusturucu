'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface PdfPreviewProps {
  kartvizitPdf: { data: Uint8Array } | null;
  yakaKartiPdf: { data: Uint8Array } | null;
}

export default function PdfPreview({ kartvizitPdf, yakaKartiPdf }: PdfPreviewProps) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full h-full">
      {/* Kartvizit Preview */}
      <div className="w-full aspect-[9.4/5.6] shadow-xl overflow-hidden flex items-center justify-center bg-black">
        {kartvizitPdf ? (
          <Document file={kartvizitPdf} loading={<Skeleton className="w-full h-full" />}>
            <Page
              pageNumber={1}
              width={typeof window !== 'undefined' ? window.innerWidth < 768 ? window.innerWidth - 32 : (window.innerWidth - 450 - 64) / 2 : 600}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        ) : <Skeleton className="w-full h-full" />}
      </div>

      {/* Yaka Kartı Preview */}
      <div className="w-full aspect-[7.5/10.5] shadow-xl overflow-hidden flex items-center justify-center bg-black">
        {yakaKartiPdf ? (
          <Document file={yakaKartiPdf} loading={<Skeleton className="w-full h-full" />}>
            <Page
              pageNumber={1}
              width={typeof window !== 'undefined' ? window.innerWidth < 768 ? window.innerWidth - 32 : (window.innerWidth - 450 - 64) / 2 : 400}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        ) : <Skeleton className="w-full h-full" />}
      </div>
    </div>
  );
}
