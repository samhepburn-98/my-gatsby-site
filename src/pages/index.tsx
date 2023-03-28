import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
};
const headingAccentStyles = {
    color: "#663399",
};

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
    const assets = data.allContentfulAsset.nodes;
    return (
        <main style={pageStyles}>
            <h1 style={headingStyles}>
                Congratulations
                <br/>
                <span style={headingAccentStyles}>— you just made a Gatsby site! 🎉🎉🎉</span>
            </h1>

            <p>This is a gtag link:</p>
            <OutboundLink href="https://www.gatsbyjs.com/plugins/gatsby-plugin-google-analytics/">
                Visit the Google Analytics plugin page!
            </OutboundLink>
            <br/>
            <br/>
            <br/>
            <br/>

            <>
                {
                    assets && assets.map((asset, index) => {
                        const image = getImage(asset);
                        return (
                            <>
                                <div key={index}>
                                    <div>
                                        <Link to={asset.contentful_id}>{asset.title}</Link>
                                    </div>
                                    {
                                        image &&
                                        <GatsbyImage image={image} alt={asset.title ?? ""}/>
                                    }
                                </div>
                                <br/>
                                <br/>
                            </>
                        );
                    })
                }
            </>
        </main>
    );
};

export default IndexPage;


export const data = graphql`
query IndexPage {
  allContentfulAsset {
    nodes {
      contentful_id
      title,
        gatsbyImageData(
          width: 200
          placeholder: BLURRED
          )
    }
  }
}
`;

export const Head: HeadFC = () => <title>Home Page</title>;
