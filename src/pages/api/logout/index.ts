import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    req.session.destroy();

    res.json({
      status: '200',
      message: 'Succesfully logout'
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e
    });
  }
}
