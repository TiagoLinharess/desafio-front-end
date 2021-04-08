import { useState } from "react";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { Container } from './styles';

interface EventProps {
  target: {
    value: number;
    name: string;
  }
}

interface RatingProps {
  onChange: (e: EventProps) => void;
  error: string | number | undefined;
}

export const Rating = ({onChange, error}: RatingProps) => {
  const stars = ['star0', 'star1', 'star2', 'star3', 'star4', 'star5'];
  const [filledIndex, setFilledIndex] = useState(0);

  const handleFillStars = (index: number) => {
    setFilledIndex(index);
    const event = {
      target: {
        value: index,
        name: 'rating',
      }
    }
    onChange(event);
  }

  const onShowStars = (index: number) => {
    if (filledIndex >= index) {
      return <IoStar key={index} className="filled" onClick={() => handleFillStars(index)} />
    }
    return <IoStarOutline key={index} onClick={() => handleFillStars(index)} />;
  }

  return (
    <Container>
      {stars.map((star, index) => index !== 0 && onShowStars(index))}
      {error && (
        <p className="inputError">{error}</p>
      )}
    </Container>
  );
}