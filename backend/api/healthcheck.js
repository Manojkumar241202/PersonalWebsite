export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        res.status(200).send("service is up and running")
      } catch (error) {
        res.status(500).send('Error retrieving data');
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }