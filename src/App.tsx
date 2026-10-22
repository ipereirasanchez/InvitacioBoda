import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { CountdownSection } from "./components/CountdownSection";
import { StorySection } from "./components/StorySection";
import { GallerySection } from "./components/GallerySection";
import { LocationSection } from "./components/LocationSection";
import { FAQSection } from "./components/FAQSection";
import { RSVPSection } from "./components/RSVPSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <GallerySection />
        <LocationSection />
        <FAQSection />
        <RSVPSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
