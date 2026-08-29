
import "../styles/glass-button.css"

type GlassButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassButton({ className = '', children }: GlassButtonProps) {
  return (
    <button className={`glass-button ${className} w-full`}>
      {children}
    </button>
  );
}