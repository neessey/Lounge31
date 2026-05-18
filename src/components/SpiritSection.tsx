export default function SpiritSection() {
  return (
    <section className="relative min-h-screen mt-4 mx-4" id="about">
      <div className="absolute inset-0 z-0">
        <img
          src="spirit.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen  items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl  text-gold leading-tight mb-2">
              TESTEZ
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6">
              NOS SAVEURS
            </h2>
            <p className="text-cream/70 text-xs mb-8 leading-relaxed">
              De la gastronomie unique en saveur et en goût !
            </p>
            <button
              type="button"
              className="px-8 py-3 border border-cream text-cream text-sm hover:bg-cream hover:text-dark transition-colors rounded-full"
            >
              A propos de nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
