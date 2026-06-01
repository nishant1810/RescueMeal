const validateMiddleware =
  (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,

        message:
          error.errors?.[0]?.message ||
          "Validation Error",
      });
    }
  };

export default validateMiddleware;