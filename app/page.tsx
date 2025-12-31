import HeroSection from '@/components/home/HeroSection';
import BrandCarousel from '@/components/home/BrandCarousel';
import PromoBanner from '@/components/home/PromoBanner';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductGrid from '@/components/home/ProductGrid';
import OffersSection from '@/components/home/OffersSection';
import Testimonials from '@/components/home/Testimonials';
import EnvironmentSection from '@/components/home/EnvironmentSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandCarousel />
      <PromoBanner />
      <CategoriesSection />
      <ProductGrid />
      <OffersSection />
      <Testimonials />
      <EnvironmentSection />
    </>
  );
}
