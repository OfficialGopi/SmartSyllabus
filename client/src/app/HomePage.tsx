import Benefits from "@/components/landing/Benefits";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
// import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Container from "@/components/ui/Container";

const HomePage = () => {
  return (
    <Container>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      {/* <Pricing /> */}
      <CTA />
      <Footer />
    </Container>
  );
};

export default HomePage;
