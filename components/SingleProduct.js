import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './DisplayError';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      id
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <div>
      <div className="details">
        <img
          src={data.Product.photo.image.publicUrlTransformed}
          alt={data.Product.photo.altText}
        />
        <h2>The {data.Product.name}</h2>
        <p>{data.Product.description}</p>
        <p>{data.Product.price}</p>
      </div>
    </div>
  );
}
