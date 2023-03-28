import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SinglePage = ({ data }: PageProps<Queries.SinglePageQuery>) => {
    const asset = data.contentfulAsset
    const image = getImage(asset);

    return (
        <>
            <div>
                <Link to="/">Back</Link>
            </div>
            <h1>{asset?.title}</h1>
            {
                image &&
                <GatsbyImage image={image} alt={asset?.title ?? ""}/>
            }
        </>
    );
};

export default SinglePage;

export const query = graphql`
  query SinglePage($id: String) {
  contentfulAsset(contentful_id: {eq: $id}) {
    contentful_id
    title
    gatsbyImageData(width: 200, placeholder: BLURRED)
  }
}
`;
