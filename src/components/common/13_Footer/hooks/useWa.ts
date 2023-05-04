import {graphql, useStaticQuery} from "gatsby";
import {getImage} from "gatsby-plugin-image";

 interface RootImage {
    file: FileItem
}

 interface FileItem {
     id: string

     childImageSharp: ChildImageSharp
}

 interface ChildImageSharp {
    gatsbyImageData: GatsbyImageData
}

 interface GatsbyImageData {
    layout: string
    backgroundColor: string
    images: Images
    width: number
    height: number
}

 interface Images {
    fallback: Fallback
    sources: Source[]
}

 interface Fallback {
    src: string
    srcSet: string
    sizes: string
}

 interface Source {
    srcSet: string
    type: string
    sizes: string
}


const useWa = () => {

//     const data: RootImage = useStaticQuery(graphql`
//   query ImageQuery {
//   file(name: {eq: "wa"}) {
//     id
//     childImageSharp {
//       gatsbyImageData
//     }
//   }
// }`)
    // @ts-ignore
    // const image = getImage(data.file)
    // console.log(data)
    // return data
};
//
export default useWa;
