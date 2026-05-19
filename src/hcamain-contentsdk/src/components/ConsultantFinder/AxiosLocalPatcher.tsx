'use client';

import axios from 'axios';

// fix up https to http for localhost:3000 disconnected mode use
axios.interceptors.request.use((req) => {
  req.url =
    window?.location?.hostname == 'localhost' &&
    req?.url &&
    req.url.indexOf('https:/api/') > -1
      ? req?.url?.replaceAll('https', 'http')
      : req?.url;
  return req;
});
