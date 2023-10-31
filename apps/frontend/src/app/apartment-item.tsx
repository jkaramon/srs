import { Apartment } from './types/apartment';

export interface ApartmentItemProps {
  data: Apartment;
}

export function ApartmentItem(props: ApartmentItemProps) {
  const { data } = props;
  console.log(data.id);
  return (
    <li>
      <h3>{data.title}</h3>
      <img src={data.image_url} alt={data.title} />
    </li>
  );
}
