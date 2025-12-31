import HeroSection from '@/components/home/HeroSection';
import BrandCarousel from '@/components/home/BrandCarousel';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductGrid from '@/components/home/ProductGrid';
import OffersSection from '@/components/home/OffersSection';
import Testimonials from '@/components/home/Testimonials';
import PromoBanner from '@/components/home/PromoBanner';
import EnvironmentSection from '@/components/home/EnvironmentSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandCarousel />
      <CategoriesSection />
      <ProductGrid />
      <OffersSection />
      <Testimonials />
      <PromoBanner />
      <EnvironmentSection />
    </>
  );
}

