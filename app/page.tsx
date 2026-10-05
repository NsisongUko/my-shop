import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import DigitalResources from './components/DigitalResources';
import CareerBoosters from './components/CareerBoosters';
import CoursesTeaser from './components/CoursesTeaser';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <DigitalResources />
      <CareerBoosters />
      <CoursesTeaser />
      <Testimonials />
    </>
  );
}