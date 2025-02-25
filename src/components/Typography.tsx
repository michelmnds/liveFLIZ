interface TypographyProps {
  className?: string;
  children: React.ReactNode;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const Typography = ({ className, children, type }: TypographyProps) => {
  switch (type) {
    case 'h1':
      return <h1 className={`text-5xl font-bold text-secondaryColor ${className}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`text-4xl text-secondaryColor ${className}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`text-3xl text-secondaryColor ${className}`}>{children}</h3>;
    case 'h4':
      return <h4 className={`text-2xl text-secondaryColor ${className}`}>{children}</h4>;
    case 'p':
      return <p className={`text-xl text-secondaryColor ${className}`}>{children}</p>;
    default:
      return <span className={`text-base text-secondaryColor ${className}`}>{children}</span>;
  }
};
