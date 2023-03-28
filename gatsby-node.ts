// Because we used ts-node in gatsby-config.js, this file will automatically be
// imported by Gatsby instead of gatsby-node.js.

// Use the type definitions that are included with Gatsby.
import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
                                                                 actions,
                                                                 graphql,
                                                             }) => {
    const { createPage } = actions;

    const allAssets: {
        errors?: any;
        data?: Queries.IndexPageQuery;
    } = await graphql(`
    query MyQuery {
      allContentfulAsset {
        nodes {
          contentful_id
          title
          gatsbyImageData(
            width: 200
            placeholder: BLURRED
          )
        }
      }
    }
  `);

    allAssets.data?.allContentfulAsset.nodes.forEach(node => {
        const { contentful_id } = node;
        if (!contentful_id) return;

        // Type-safe `createPage` call.
        createPage({
            path: contentful_id,
            component: resolve(__dirname, './src/templates/SinglePage.tsx'),
            context: {
                id: contentful_id,
            },
        });
    });
};
