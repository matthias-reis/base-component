import { Cask } from "@/cask";
import { styled } from "next-yak";

const Card = styled(Cask).attrs({
  p: "l",
})`
  border: 1px solid grey;
  border-radius: 1rem;
`;

export default Card;
