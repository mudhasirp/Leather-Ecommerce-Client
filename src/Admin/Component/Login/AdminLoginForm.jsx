
export default function AdminLoginForm({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
          Admin Email
        </label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full bg-background/60 border border-border/70 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/70 focus:border-primary/70 placeholder:text-muted-foreground/60"
          placeholder="admin@leatherhaven.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full bg-background/60 border border-border/70 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/70 focus:border-primary/70 placeholder:text-muted-foreground/60"
          placeholder="Enter admin password"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
        <span>Only authorized Leather Haven staff.</span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Signing in..." : "Sign in as Admin"}
      </button>
    </form>
  );
}
