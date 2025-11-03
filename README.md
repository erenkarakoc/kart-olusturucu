# Kart Oluşturucu

<div align="center">
  <img src="public/tam_yan_kirmizi_beyaz.svg" alt="Kart Oluşturucu Logo" width="200">

  <p>
    <strong>Profesyonel kartvizit ve yaka kartı oluşturma aracı</strong>
  </p>

  <p>
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js" alt="Next.js">
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react" alt="React">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" alt="TypeScript">
    </a>
  </p>
</div>

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Geliştirme](#-geliştirme)
- [Lisans](#-lisans)

---

## 🎯 Hakkında

Kart Oluşturucu, gayrimenkul danışmanları ve profesyoneller için özel olarak tasarlanmış, kullanımı kolay bir kartvizit ve yaka kartı oluşturma aracıdır. Kullanıcılar bilgilerini girerek anında PDF formatında profesyonel kartlar oluşturabilir ve indirebilir.

### Neden Kart Oluşturucu?

- ✅ **Hızlı ve Kolay**: Bilgilerinizi girin, anında önizleme alın
- ✅ **Profesyonel Tasarım**: Özel tasarlanmış şablonlar
- ✅ **PDF Çıktı**: Yüksek kaliteli, baskıya hazır PDF dosyaları
- ✅ **Gerçek Zamanlı Önizleme**: Yaptığınız değişiklikleri anında görün
- ✅ **Responsive Tasarım**: Her cihazda sorunsuz çalışır

---

## ✨ Özellikler

### 🎨 Kartvizit Özellikleri
- Ad, soyad, ünvan bilgileri
- Cep telefonu ve ofis telefonu (Türkiye formatında)
- Email adresi
- Çok satırlı adres desteği
- Orta hizalı başlık ve isim
- Özel font desteği (Unbounded)

### 🏷️ Yaka Kartı Özellikleri
- Büyük, merkezi ad-soyad gösterimi
- Ünvan bilgisi
- Dikey format
- Profesyonel görünüm

### 📱 Genel Özellikler
- **Gerçek Zamanlı Önizleme**: Değişikliklerinizi anında görün
- **PDF İndirme**: Kartvizit ve yaka kartını tek tıkla indirin
- **Font İndirme**: Unbounded font ailesini ZIP olarak indirin
- **Türkçe Telefon Formatı**: Otomatik +90 (5XX) XXX XX XX formatı
- **Çok Satırlı Destek**: Ünvan ve adres için satır ayırma
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Debounce Optimizasyonu**: Performanslı veri girişi

---

## 🛠️ Teknolojiler

### Frontend Framework
- **Next.js 16.0** - React framework
- **React 19.2** - UI kütüphanesi
- **TypeScript 5** - Type-safe geliştirme

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Yeniden kullanılabilir komponentler
- **Radix UI** - Erişilebilir UI primitives

### PDF İşleme
- **pdf-lib** - PDF oluşturma ve düzenleme
- **react-pdf** - PDF önizleme
- **pdfjs-dist** - PDF rendering
- **fontkit** - Font embedding

### Form & Input
- **react-phone-number-input** - Telefon numarası formatı
- **clsx & tailwind-merge** - Koşullu sınıf yönetimi

---

## 📦 Kurulum

### Gereksinimler
- Node.js 20 veya üzeri
- npm veya yarn

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/erenkarakoc/kart-olusturucu.git
cd kart-olusturucu
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### Adım 3: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 🚀 Kullanım

### 1. Bilgilerinizi Girin
- **Ad & Soyad**: İsim bilgileriniz
- **Ünvan**: Meslek ünvanınız (çok satır destekli)
- **Cep Telefonu**: Mobil telefon numaranız
- **Ofis Telefonu**: İş yeri telefon numaranız
- **Email**: Email adresiniz
- **Adres**: İş yeri adresiniz (çok satır destekli)

### 2. Önizleme
Sağ tarafta kartvizit ve yaka kartınızın gerçek zamanlı önizlemesini görürsünüz.

### 3. İndirin
- **Kartviziti İndir**: Kartvizitinizi PDF olarak indirin
- **Yaka Kartını İndir**: Yaka kartınızı PDF olarak indirin
- **Yazı Tipini İndir**: Unbounded font ailesini ZIP olarak indirin

### Çok Satır Girişi
Ünvan ve Adres alanlarında Enter tuşuna basarak yeni satır ekleyebilirsiniz.

---

## 🔧 Geliştirme

### Proje Yapısı
```
kart-olusturucu/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global stiller
├── components/
│   ├── local/             # Özel komponentler
│   │   ├── ClientPageContent.tsx  # Ana form ve PDF oluşturma
│   │   └── PdfPreview.tsx         # PDF önizleme
│   └── ui/                # Yeniden kullanılabilir UI komponentleri
├── lib/                   # Utility fonksiyonlar
├── public/
│   ├── fonts/            # Unbounded font dosyaları
│   ├── templates/        # PDF şablonları
│   └── unbounded-fonts.zip
└── package.json
```

### Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint
```

### PDF Şablonları
PDF şablonları `public/templates/` klasöründe bulunur:
- `kartvizit.pdf` - Kartvizit şablonu (9.4cm x 5.6cm)
- `yaka-karti.pdf` - Yaka kartı şablonu (7.5cm x 10.5cm)

### Font Desteği
Unbounded font ailesi `public/fonts/` klasöründedir:
- Unbounded-Black.ttf
- Unbounded-Bold.ttf
- Unbounded-ExtraBold.ttf
- Unbounded-ExtraLight.ttf
- Unbounded-Light.ttf
- Unbounded-Medium.ttf
- Unbounded-Regular.ttf
- Unbounded-SemiBold.ttf

---

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

---

## 👨‍💻 Geliştirici

**Eren Karakoç**

- GitHub: [@erenkarakoc](https://github.com/erenkarakoc)

---

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [pdf-lib](https://pdf-lib.js.org/)
- [Unbounded Font](https://fonts.google.com/specimen/Unbounded)

---

<div align="center">
  <p>⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!</p>
</div>
