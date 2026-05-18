import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpiritSection from "@/components/SpiritSection";
import SignaturePlates from "@/components/SignaturePlates";
import CateringSection from "@/components/CateringSection";
import DrinksSection from "@/components/DrinksSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <SpiritSection />
            <SignaturePlates />
            <CateringSection />
            <DrinksSection />
            <ReviewsSection />
            <Footer />
        </main>
    );
}
