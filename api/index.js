export default async (req, res) => {
  const { query } = req;

  try {
    if (!(query.contract && query.function))
      throw new Error(`Parameters 'contract' & 'function' are required`);

    res.json({
      gwei: 10000000,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
