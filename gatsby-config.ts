import type {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    // pathPrefix: `https://angel-cdn.na4u.ru`,
    assetPrefix: `https://angel-cdn.na4u.ru`,
    graphqlTypegen: true,
    plugins: [
        {
        resolve: 'gatsby-source-wordpress',
        options: {
            "url": process.env.WPGRAPHQL_URL || "http://admin.angelclub.ru/graphql",
        }
    },
        // {
        //     resolve: 'gatsby-plugin-apollo',
        //     options: {
        //         uri: 'https://angel-back.testingplace.ru/graphql'
        //     }
        // },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,

            },

        },

        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: [`webp`],
                    placeholder: `dominantColor`,
                    quality: 50,
                    breakpoints: [750, 1080, 1366, 1920],
                    backgroundColor: `transparent`,
                    blurredOptions: {},
                    jpgOptions: {},
                    pngOptions: {},
                    webpOptions: {},
                    avifOptions: {},
                },
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://angel-frontend.testingplace.ru',
                policy: [{userAgent: '*', allow: '/'}]
            }
        },
        "gatsby-plugin-image", "gatsby-transformer-sharp", 'gatsby-plugin-postcss', 'gatsby-plugin-sass', 'gatsby-plugin-react-css-modules']
};

export default config;
