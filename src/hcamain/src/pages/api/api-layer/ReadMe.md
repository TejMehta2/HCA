# Integration API Proxy

This API route provides a proxy around the API layer, to avoid direct contact between a user's browser, and the API layer endpoints.

It can be consumed in client-side fetch requests by prefixing your integration API request with the following environmental variable value:

```
NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH=/api/api-layer
```

It is intended to be used on the site searches. E.g. locations search.

This proxy should not be used inside server-side fetching functions, e.g. getStaticProps, getServerSideProps because those requests never occur on the client-side.