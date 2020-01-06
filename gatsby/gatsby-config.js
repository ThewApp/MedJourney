module.exports = {
  siteMetadata: {
    title: `MDCU Open House 2020 : MedJourney`,
    shortTitle: `MedJourney`,
    description: `กิจกรรมสุดพิเศษ 2 วันเต็ม ที่จะทำให้ทุก ๆ คนได้รู้ลึก รู้จริง รู้ทุกเรื่องเกี่ยวกับคณะแพทย์ จุฬาฯ รับรองว่าหาจากที่ไหนไม่ได้อีกแน่นอน`,
    author: `@mdcuopenhouse`,
    facebook: `https://facebook.com/mdcuopenhouse`
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MDCU Open House 2020 : MedJourney`,
        short_name: `MedJourney`,
        start_url: `/`,
        background_color: `#a8301a`,
        theme_color: `#5f1b1f`,
        display: `minimal-ui`,
        icon: `src/images/logo-rounded.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  proxy: {
    prefix: "/__",
    url: "http://localhost:5000"
  }
};
