// Auth
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'interfaces/userFromSunlight';
import { fetchSunlight } from '@utils/fetch-api/fetchSunlight';
const jwt = require('jsonwebtoken');

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const requestUrl: string = `${req.headers.referer}api/validate/me`;
  const { token, group } = req.query;
 
  try {
    const { host } = req.headers;
    const userDataSunlight = await fetchSunlight(requestUrl, token, host);
    const userData: User = getTokenData(userDataSunlight.token);
    req.session.user = userData;
    await req.session.save();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }

  const url = group ? `/upload-members/${group}` : '/'
  res.redirect(307, url);
  // res.redirect() // something here must have the new generate cookie
}

function getTokenData(token: string): User {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET, {
    algorithms: ['HS256']
  });
  return decoded;
}
