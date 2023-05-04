export interface RootQuery {
    data: Data
    extensions: Extensions
}

export interface Data {
    allFile: AllFile,
    allWpMenuItem: AllWpMenuItem;
}

export interface AllFile {
    nodes: Node[]
}

export interface Node {
    childImageSharp: ChildImageSharp
    name: string
}

export interface AllWpMenuItem {
    nodes: AllWpMenuItemNode[];
}


export interface AllWpMenuItemNode {
    label:      string;
    url:        string;
    childItems: AllWpMenuItem;
}

export interface AllWpMenuItem {
    nodes: AllWpMenuItemNode[];
}
export interface ChildImageSharp {
    gatsbyImageData: GatsbyImageData
}

export interface GatsbyImageData {
    layout: string
    backgroundColor: string
    images: Images
    width: number
    height: number
}

export interface Images {
    fallback: Fallback
    sources: Source[]
}

export interface Fallback {
    src: string
    srcSet: string
    sizes: string
}

export interface Source {
    srcSet: string
    type: string
    sizes: string
}

export interface Extensions {}
