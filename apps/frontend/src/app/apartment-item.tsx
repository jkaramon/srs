import { Apartment } from './types/apartment';

export interface ApartmentItemProps {
  data: Apartment;
}

export function ApartmentItem(props: ApartmentItemProps) {
  const { data } = props;
  return (
    <li className="item">
      <h3>{data.title}</h3>
      <img src={data.image_url} alt={data.title} />
    </li>
  );
}
