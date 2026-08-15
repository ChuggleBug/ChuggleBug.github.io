
import "../styles/glass-button.css"

type GlassButtonProps = {
  className?: string; 
  children: React.ReactNode;
};

export function GlassButton({ className = '', children }: GlassButtonProps) {
  return (
    <button className={`py-3 min-w-20 glass-button ${className}`}>
      <p className="text-center font-bold text-white w-full">
        {children}
      </p>
    </button>
  );
}