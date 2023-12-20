import { BtnLoad } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnLoad type="button" onClick={onClick}>
      Load More
    </BtnLoad>
  );
};
