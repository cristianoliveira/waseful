# Waseful SDK

Get pages feedback from your users in a simple way.

### Usage

Add the following script tag to your HTML page:

```html
<script async charset="utf-8">
  function onLoad() {
    waseful.render({
      selector: "#hilfreich",
    });
  }
</script>
<script
  type="module"
  onload="onLoad()"
  src="https://diwb7ye69az6s.cloudfront.net/sdk.js"
  type="text/javascript"
/>
```

## Getting Started

This section contains instructions for getting started with the SDK.

### Prerequisites

- [npm](https://www.npmjs.com/get-npm)

### Installation

```sh
npm i
npm run serve
```

Visit https://localhost:8081

## Built with

- [Parcel](https://parceljs.org/) - The web application bundler used
- [Prisma](https://www.prisma.io/) - The database used
- [Vitest](https://vitest.netlify.app/) - The testing framework used
- [Preact](https://preactjs.com/) - The web framework used
- [Hosted at AWS S3](https://aws.amazon.com/) - The cloud platform used
