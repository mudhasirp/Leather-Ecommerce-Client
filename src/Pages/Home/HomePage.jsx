import HeaderLayout from "@/Layout/Header/HeaderLayout";
import BannerSection from "@/Layout/Banner/BannerLayout";
import FeaturedCategories from "@/Layout/Categories/FeaturedCategoriesLayout";
import FeaturedProducts from "@/Layout/Products/FeaturedProductLayout";
import CraftsmanshipSection from "@/Layout/Banner/CraftmanshipSection";
import NewsletterBanner from "@/Layout/Banner/NewsLetterBanner";
import Footer from "@/Layout/Footer/FooterLayout";
import ImageAdBanner from "@/Components/Shop/ImageAdBanner";

export default function HomePage(){
    return (
        <main className="min-h-screen bg-background"> 
        <HeaderLayout/>
        <BannerSection/>
                <FeaturedProducts/>

        <FeaturedCategories/>
                <ImageAdBanner/>

        <CraftsmanshipSection/>
        <NewsletterBanner/>
        <Footer/>
        </main>
    )
}