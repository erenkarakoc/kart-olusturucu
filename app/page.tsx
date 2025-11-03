import Image from 'next/image';
import ClientPageContent from '@/components/local/ClientPageContent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 gap-8">
      <div className="flex items-center gap-4">
        <Image
          src="/tam_yan_kirmizi_beyaz.svg"
          alt="Lyra Real Estate Logo"
          width={200}
          height={100}
        />
        <span className="text-[16px] leading-none font-[300]">|</span>
        <span className="text-[16px] leading-none font-[300]">Kart Oluşturucu</span>
      </div>
      <ClientPageContent />
    </main>
  );
}
