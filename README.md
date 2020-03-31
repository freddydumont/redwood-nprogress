# redwood-nprogress

Theme aware NProgress component to use in RedwoodJS apps using Emotion or ThemeUI.

This component is a fork of [`next-nprogress-emotion`](https://github.com/freddydumont/next-nprogress-emotion/) package. It was converted to use with RedwoodJS.

## Installation

```bash
yarn add redwood-nprogress
```

or

```bash
npm install redwood-nprogress
```

## Usage

### Component

Because this component relies on [`PageLoadingContext`](https://redwoodjs.com/docs/redwood-router#pageloadingcontext), it needs to be imported __under each route__.

It is thus recommended to use a [`layout`](https://redwoodjs.com/tutorial/layouts) to wrap each of your pages. For example:

Import the component inside your `layouts/GlobalLayout`;

```js
import NProgress from 'redwood-nprogress'

const GlobalLayout = ({ children }) => {
  return (
    <>
      <NProgress />
      {children}
    </>
  )
}

export default GlobalLayout
```

Then wrap your pages in `<GlobalLayout>`:

```javascript
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

const HomePage = () => {
  return (
    <GlobalLayout>
      {/* page content */}
    </GlobalLayout>
  )
}

export default HomePage
```

If you're using ThemeUI, that's all you need to do. The component will use the primary color by default.

You can change the color using a theme color or any css color:

```jsx
// using a theme color
<NProgress color="accent" />
```

```jsx
// using css
<NProgress color="#fff" />
```

### Config

The [page loading delay](https://redwoodjs.com/docs/redwood-router#pageloadingcontext) should be configured on Redwood Router itself:

```javascript
// Routes.js

<Router pageLoadingDelay={300}>...</Router>
```

You can configure NProgress using its [configuration options](https://github.com/rstacruz/nprogress#configuration).

```jsx
<NProgress
  color="#29d"
  options={{ trickleSpeed: 50 }}
  spinner
/>
```
