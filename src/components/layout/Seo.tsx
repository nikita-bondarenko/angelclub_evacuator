import React from "react"
import favicon from "../../static/favicon.ico";
import smallImageUrl from '../../static/share_2.jpg';
import bigImageUrl from '../../static/share_1.jpg';
interface SeoProps {
    metaData: Queries.WpPage_Metadata

}

const Seo = ({metaData}: SeoProps) => {

        const baseUrl = metaData?.metaAdresSajta?.slice(-1) === '/' ? metaData?.metaAdresSajta?.slice(0,-1) : metaData?.metaAdresSajta

    return (
        <>
                <html lang="ru" />
            <meta charSet="UTF-8"/>
            <meta content="width=device-width, user-scalable=no"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <title>{metaData?.metaTitle}</title>
            <meta name="description"
                  content={metaData?.metaDescription || ''}/>
            <meta name="theme-color" content="#000000"/>
            <meta property="og:url" content={baseUrl || ''}/>
            <meta property="og:title" content={metaData?.metaTitle || ''}/>
            <meta property="og:description"
                  content={metaData?.metaDescription || ''}/>
            <meta property="og:image"
                  content={baseUrl + bigImageUrl}/>
            <meta property="og:type" content="website"/>
            <meta property="og:locale" content="ru_RU"/>
            <meta property="og:image:alt" content=""/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
            <meta property="og:image:secure_url"
                  content={baseUrl + bigImageUrl}/>
            <meta name="description"
                  content={metaData?.metaDescription || ''}/>
            <meta property="vk:image"
                  content={baseUrl + smallImageUrl}/>
            <meta name="twitter:title"
                  content={metaData?.metaTitle || ''}/>
            <meta name="twitter:description"
                  content={metaData?.metaDescription || ''}/>
            <meta name="twitter:card"
                  content="summary_large_image"/>
            <meta name="twitter:site"
                  content="@"/>
            <meta
                name="twitter:image"
                content={baseUrl + bigImageUrl}/>
            <meta
                name="twitter:creator"
                content="@"/>
            {/*<link*/}
            {/*    rel="shortcut icon"*/}
            {/*    href="https://drive.google.com/file/d/1YzS9-Zp0VBkAPc6ABA4Em1id3zUqvOxT/view?usp=drive_link"*/}
            {/*    type="image/vnd.microsoft.icon"/>*/}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Open+Sans:ital,wght@1,300&display=swap"/>
                {/*<link rel="stylesheet" href="https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css"/>*/}
                <script src="https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js"></script>
                <script
                    src="https://code.jquery.com/jquery-3.4.1.min.js"
                    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                    crossOrigin="anonymous">
                </script>
         </>
    )
}

export default Seo
