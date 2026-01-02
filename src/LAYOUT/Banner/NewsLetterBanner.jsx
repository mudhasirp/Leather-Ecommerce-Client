
import { useState } from "react";
import InputField from "@/Components/Input/Input";
import LuxButton from "@/Components/Button/LuxButton";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-6 bg-card/50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border/30 rounded-sm p-12 md:p-16 text-center space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-foreground">
              Join the Vegetable Circle
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Be the first to access limited drops and exclusive releases.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <InputField
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <LuxButton type="submit">Subscribe</LuxButton>
            </div>

            {isSubmitted && (
              <p className="text-sm text-accent font-light">
                Thank you for subscribing!
              </p>
            )}
          </form>

          <p className="text-xs text-muted-foreground font-light tracking-widest">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
