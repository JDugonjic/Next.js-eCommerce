import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
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
    <ProductStyles>
      <Head>
        <title>Sick Fits | {data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.photo.altText}
      />
      <div className="details">
        <h2>The {data.Product.name}</h2>
        <p>{data.Product.description}</p>
        <p>{data.Product.price}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
