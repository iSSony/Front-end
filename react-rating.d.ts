declare module "react-rating" {
  interface RatingProps {
    className?: string;
    initialRating: number;
    emptySymbol: React.ReactNode; // This can be more specific than React.ReactNode
    fullSymbol: React.ReactNode; // This can be more specific than React.ReactNode
    readonly?: boolean;
    fractions?: number;
    // Add other props as needed
  }

  const Rating: React.ComponentType<any>;

  export default Rating;
}
