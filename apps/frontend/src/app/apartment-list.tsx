import { ApartmentItem } from './apartment-item';
import { Apartment } from './types/apartment';

export interface ApartmentListProps {
  data: Apartment[];
}

export function ApartmentList(props: ApartmentListProps) {
  const { data } = props;
  return (
    <ul>
      {data.map((apartment) => (
        <ApartmentItem data={apartment} key={apartment.id} />
      ))}
    </ul>
  );
}
