// Local-only public-site preview. Does not expose the admin application.
const i=process.argv.indexOf('--port');if(i>=0)process.env.PORT=process.argv[i+1];
if(process.env.NODE_ENV==='production')throw Error('Use deploy-server.js in production');
process.env.PORTFOLIO_PREVIEW='1';
require('./server');
