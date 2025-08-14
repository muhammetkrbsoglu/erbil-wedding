interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  );
}
