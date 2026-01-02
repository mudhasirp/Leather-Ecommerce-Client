import { Link } from "react-router-dom";
import LuxButton from "@/Components/Button/LuxButton";

export default function CreativeVegBanner() {
  return (
<section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-green-50 via-green-100 to-lime-100 flex items-center">
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-lime-300/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-green-900">
            Fresh Vegetables <br />
            <span className="text-green-700">Straight From Farms</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/shop">
              <LuxButton variant="primary" size="lg">
                Shop Vegetables
              </LuxButton>
            </Link>

            <Link to="/shop">
              <LuxButton variant="outline" size="lg">
                Explore Categories
              </LuxButton>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
  <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl 
                  p-8 w-[360px] md:w-[420px] lg:w-[480px]
                  shadow-2xl">
    <img
      src="/veg-banner.png"
      alt="Fresh vegetables"
      className="w-full h-auto object-contain"
    />

    <div className="absolute -top-5 -right-5 bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg rotate-3">
      50% OFF
    </div>
  </div>
</div>


      </div>
    </section>
  );
}
