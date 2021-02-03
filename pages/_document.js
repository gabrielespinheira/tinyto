import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0, width=device-width"
          />
          <meta
            name="application-name"
            content={process.env.NEXT_PUBLIC_PROJECT_NAME}
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="browsermode" content="application" />
          <meta name="full-screen" content="yes" />
          <meta
            name="apple-mobile-web-app-title"
            content={process.env.NEXT_PUBLIC_PROJECT_NAME}
          />
          <meta
            name="description"
            content={process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
