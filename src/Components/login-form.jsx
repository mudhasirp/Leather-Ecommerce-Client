import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="font-sans text-6xl font-light tracking-tight text-foreground">
          LEATHER
          <br />
          HAVEN
        </h1>
        <div
          className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent mx-auto my-4" />
        <p className="text-xs tracking-widest text-muted-foreground font-light">PREMIUM CRAFTED LEATHER</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs tracking-widest text-muted-foreground font-light uppercase">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-xs tracking-widest text-muted-foreground font-light uppercase">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all" />
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-accent transition-colors font-light">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-sm">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="pt-6 border-t border-border/30">
        <p className="text-sm text-muted-foreground font-light">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-foreground hover:text-accent font-medium transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
