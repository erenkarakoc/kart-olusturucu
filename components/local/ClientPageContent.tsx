'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PDFDocument, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';
import PhoneInput, { formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Custom phone formatter with parentheses for Turkish numbers
function formatPhoneWithParentheses(phoneNumber: string | undefined): string {
  if (!phoneNumber) return '';

  try {
    const parsed = parsePhoneNumber(phoneNumber);
    if (!parsed) return phoneNumber;

    // For Turkish numbers, format as +90 (XXX) XXX XX XX
    if (parsed.country === 'TR') {
      const nationalNumber = parsed.nationalNumber;
      if (nationalNumber.length === 10) {
        return `+90 (${nationalNumber.slice(0, 3)}) ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6, 8)} ${nationalNumber.slice(8, 10)}`;
      }
    }

    // For other countries, use default international format
    return formatPhoneNumberIntl(phoneNumber);
  } catch (error) {
    return phoneNumber;
  }
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const DynamicPdfPreview = dynamic(() => import('@/components/local/PdfPreview'), { ssr: false });

export default function ClientPageContent() {
  // Anlık input değerleri
  const [ad, setAd] = useState('Ad');
  const [soyad, setSoyad] = useState('Soyad');
  const [unvan, setUnvan] = useState('Ünvan');
  const [telefon, setTelefon] = useState('+905425551243');
  const [ofisTelefon, setOfisTelefon] = useState('+905333150343');
  const [email, setEmail] = useState('info@lyrarealestate.com');
  const [adres, setAdres] = useState('Turan Güneş Bulvarı,\nNo: 75/1, Çankaya, Ankara');

  // Debounce edilmiş değerler
  const debouncedAd = useDebounce(ad, 300);
  const debouncedSoyad = useDebounce(soyad, 300);
  const debouncedUnvan = useDebounce(unvan, 300);
  const debouncedTelefon = useDebounce(telefon, 300);
  const debouncedOfisTelefon = useDebounce(ofisTelefon, 300);
  const debouncedEmail = useDebounce(email, 300);
  const debouncedAdres = useDebounce(adres, 300);

  // Format phone numbers for display on PDF
  const formattedTelefon = formatPhoneWithParentheses(debouncedTelefon);
  const formattedOfisTelefon = formatPhoneWithParentheses(debouncedOfisTelefon);

  const [kartvizitPdf, setKartvizitPdf] = useState(null);
  const [yakaKartiPdf, setYakaKartiPdf] = useState(null);
  const [kartvizitPdfForDownload, setKartvizitPdfForDownload] = useState(null);
  const [yakaKartiPdfForDownload, setYakaKartiPdfForDownload] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [isDownloadingKartvizit, setIsDownloadingKartvizit] = useState(false);
  const [isDownloadingYakaKarti, setIsDownloadingYakaKarti] = useState(false);

  // useEffect şimdi debounce edilmiş değerleri dinliyor
  useEffect(() => {
    const updateCanvases = async () => {
      setIsPreviewLoading(true);
      try {
        const fontUrl = '/fonts/Unbounded-Regular.ttf';
        const lightFontUrl = '/fonts/Unbounded-Light.ttf';
        const kartvizitUrl = '/templates/kartvizit.pdf';
        const yakaKartiUrl = '/templates/yaka-karti.pdf';

        const [fontBytes, lightFontBytes, kartvizitTemplateBytes, yakaKartiTemplateBytes] = await Promise.all([
          fetch(fontUrl).then(async res => {
            if (!res.ok) throw new Error("Font bulunamadı");
            return res.arrayBuffer();
          }),
          fetch(lightFontUrl).then(async res => {
            if (!res.ok) throw new Error("Light font bulunamadı");
            return res.arrayBuffer();
          }),
          fetch(kartvizitUrl).then(async res => {
            if (!res.ok) throw new Error("Kartvizit template bulunamadı");
            return res.arrayBuffer();
          }),
          fetch(yakaKartiUrl).then(async res => {
            if (!res.ok) throw new Error("Yaka kartı template bulunamadı");
            return res.arrayBuffer();
          }),
        ]);

        // Kartvizit
        const kartvizitDoc = await PDFDocument.load(kartvizitTemplateBytes);
        kartvizitDoc.registerFontkit(fontkit);
        const customFont = await kartvizitDoc.embedFont(fontBytes);
        const lightFont = await kartvizitDoc.embedFont(lightFontBytes);
        const kartvizitPage = kartvizitDoc.getPages()[0];
        const pageWidth = kartvizitPage.getWidth();

        // Calculate centered positions for each text
        const nameText = `${debouncedAd} ${debouncedSoyad}`;
        const nameWidth = customFont.widthOfTextAtSize(nameText, 12);
        const nameX = (pageWidth - nameWidth) / 2;

        // Draw name
        kartvizitPage.drawText(nameText, { x: nameX, y: kartvizitPage.getHeight() - 83.8, font: customFont, size: 12, color: rgb(0.117, 0.117, 0.117) });

        // Draw ünvan with line breaks support
        const unvanLines = debouncedUnvan.split('\n');
        let unvanY = kartvizitPage.getHeight() - 98.5;
        unvanLines.forEach((line) => {
          const lineWidth = lightFont.widthOfTextAtSize(line, 6);
          const lineX = (pageWidth - lineWidth) / 2;
          kartvizitPage.drawText(line, { x: lineX, y: unvanY, font: lightFont, size: 6, color: rgb(0.117, 0.117, 0.117) });
          unvanY -= 8; // Move down for next line
        });

        // Draw phones and email on left side
        let leftY = kartvizitPage.getHeight() - 117.3;
        kartvizitPage.drawText(formattedTelefon, { x: 31.5, y: leftY, font: lightFont, size: 5, color: rgb(0.117, 0.117, 0.117) });
        leftY -= 9;
        kartvizitPage.drawText(formattedOfisTelefon, { x: 31.5, y: leftY, font: lightFont, size: 5, color: rgb(0.117, 0.117, 0.117) });
        leftY -= 9;
        kartvizitPage.drawText(debouncedEmail, { x: 31.5, y: leftY, font: lightFont, size: 5, color: rgb(0.117, 0.117, 0.117) });

        // Draw address on bottom right with right alignment and line breaks
        const adresLines = debouncedAdres.split('\n');
        let adresY = kartvizitPage.getHeight() - 126.8; // Adjust this Y position as needed
        adresLines.forEach((line) => {
          const lineWidth = lightFont.widthOfTextAtSize(line, 5);
          const lineX = pageWidth - lineWidth - 21.7; // Right align with 31.5 padding
          kartvizitPage.drawText(line, { x: lineX, y: adresY, font: lightFont, size: 5, color: rgb(0.117, 0.117, 0.117) });
          adresY -= 8; // Move down for next line
        });

        const kartvizitPdfBytes = await kartvizitDoc.save();
        // Create separate copies: one for preview (consumed by react-pdf) and one for download
        const kartvizitPreviewCopy = new Uint8Array(kartvizitPdfBytes);
        const kartvizitDownloadCopy = new Uint8Array(kartvizitPdfBytes);
        setKartvizitPdf({ data: kartvizitPreviewCopy });
        setKartvizitPdfForDownload({ data: kartvizitDownloadCopy });

        // Yaka Kartı
        const yakaKartiDoc = await PDFDocument.load(yakaKartiTemplateBytes);
        yakaKartiDoc.registerFontkit(fontkit);
        const customFontYaka = await yakaKartiDoc.embedFont(fontBytes);
        const lightFontYaka = await yakaKartiDoc.embedFont(lightFontBytes);
        const yakaKartiPage = yakaKartiDoc.getPages()[0];
        const yakaPageWidth = yakaKartiPage.getWidth();

        // Calculate centered positions for each text
        const yakaNameText = `${debouncedAd} ${debouncedSoyad}`;
        const yakaNameWidth = customFontYaka.widthOfTextAtSize(yakaNameText, 50);
        const yakaNameX = (yakaPageWidth - yakaNameWidth) / 2;
        const yakaNameY = (yakaKartiPage.getHeight() / 2) + 15;

        const yakaUnvanWidth = lightFontYaka.widthOfTextAtSize(debouncedUnvan, 30);
        const yakaUnvanX = (yakaPageWidth - yakaUnvanWidth) / 2;

        yakaKartiPage.drawText(yakaNameText, { x: yakaNameX, y: yakaNameY, font: customFontYaka, size: 50, color: rgb(1, 1, 1) });
        yakaKartiPage.drawText(debouncedUnvan, { x: yakaUnvanX, y: yakaKartiPage.getHeight() - 578, font: lightFontYaka, size: 30, color: rgb(1, 1, 1) });
        const yakaKartiPdfBytes = await yakaKartiDoc.save();
        // Create separate copies: one for preview (consumed by react-pdf) and one for download
        const yakaKartiPreviewCopy = new Uint8Array(yakaKartiPdfBytes);
        const yakaKartiDownloadCopy = new Uint8Array(yakaKartiPdfBytes);
        setYakaKartiPdf({ data: yakaKartiPreviewCopy });
        setYakaKartiPdfForDownload({ data: yakaKartiDownloadCopy });

      } catch (error) {
        console.error("Önizleme oluşturulurken hata:", error);
      } finally {
        setIsPreviewLoading(false);
      }
    };

    updateCanvases();
  }, [debouncedAd, debouncedSoyad, debouncedUnvan, debouncedTelefon, debouncedOfisTelefon, debouncedEmail, debouncedAdres, formattedTelefon, formattedOfisTelefon]);

  const handleDownload = async (pdfBytes, fileName, setIsDownloading) => {
    if (!pdfBytes || !pdfBytes.data) {
      return;
    }
    setIsDownloading(true);
    try {
      // Ensure we have a proper Uint8Array
      const uint8Array = pdfBytes.data instanceof Uint8Array
        ? pdfBytes.data
        : new Uint8Array(pdfBytes.data);

      if (uint8Array.length === 0) {
        throw new Error("PDF verisi boş!");
      }

      const blob = new Blob([uint8Array], { type: 'application/pdf' });

      if (blob.size === 0) {
        throw new Error("Oluşturulan blob boş!");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Dosya indirilirken bir hata oluştu: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadKartvizit = () => handleDownload(kartvizitPdfForDownload, 'kartvizit.pdf', setIsDownloadingKartvizit);
  const handleDownloadYakaKarti = () => handleDownload(yakaKartiPdfForDownload, 'yaka-karti.pdf', setIsDownloadingYakaKarti);

  return (
    <div className="flex justify-between gap-2 w-full">
      <Card className="w-[450px] h-fit">
        <CardHeader>
          <CardDescription>Bilgilerinizi girerek kartvizit ve yaka kartı oluşturun.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ad" className="font-normal">Ad</Label>
              <Input id="ad" placeholder="Adınız" value={ad} onChange={(e) => setAd(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="soyad" className="font-normal">Soyad</Label>
              <Input id="soyad" placeholder="Soyadınız" value={soyad} onChange={(e) => setSoyad(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="unvan" className="font-normal">Ünvan</Label>
              <Textarea id="unvan" placeholder="Ünvanınız" value={unvan} onChange={(e) => setUnvan(e.target.value)} rows={2} />
              <span className="opacity-50 text-xs">Satır ayırmak için Enter kullanın</span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="telefon" className="font-normal">Cep Telefonu</Label>
              <PhoneInput
                id="telefon"
                placeholder="Telefon Numaranız"
                value={telefon}
                onChange={(value: string | undefined) => setTelefon(value || '')}
                defaultCountry="TR"
                international
                className="phone-input-custom"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ofisTelefon" className="font-normal">Ofis Telefonu</Label>
              <PhoneInput
                id="ofisTelefon"
                placeholder="Ofis Telefonu"
                value={ofisTelefon}
                onChange={(value: string | undefined) => setOfisTelefon(value || '')}
                defaultCountry="TR"
                international
                className="phone-input-custom"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="font-normal">Email</Label>
              <Input id="email" type="email" placeholder="Email Adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="adres" className="font-normal">Adres</Label>
              <Textarea id="adres" placeholder="Adresiniz" value={adres} onChange={(e) => setAdres(e.target.value)} rows={2} />
              <span className="opacity-50 text-xs">Satır ayırmak için Enter kullanın</span>
            </div>
            <div className="flex flex-col gap-4 w-full mt-4">
              <Button type="button" className="w-full font-light" onClick={handleDownloadKartvizit} disabled={isPreviewLoading || isDownloadingKartvizit}>
                {isDownloadingKartvizit ? <Spinner /> : "Kartviziti İndir"}
              </Button>
              <Button type="button" className="w-full font-light" onClick={handleDownloadYakaKarti} disabled={isPreviewLoading || isDownloadingYakaKarti}>
                {isDownloadingYakaKarti ? <Spinner /> : "Yaka Kartını İndir"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DynamicPdfPreview kartvizitPdf={kartvizitPdf} yakaKartiPdf={yakaKartiPdf} isPreviewLoading={isPreviewLoading} />
    </div>
  );
}
