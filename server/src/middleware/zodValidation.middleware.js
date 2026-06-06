const validate =
  (schema) => {

    return (
      req,
      res,
      next
    ) => {

      try {

        /*
        ========================================
        MERGE REQUEST DATA
        ========================================
        */

        const data = {

          ...req.body,

          ...req.params,

          ...req.query,
        };

        /*
        ========================================
        VALIDATE DATA
        ========================================
        */

        schema.parse(
          data
        );

        next();

      } catch (error) {

        /*
        ========================================
        FORMAT ZOD ERRORS
        ========================================
        */

        const errors =
          error.errors?.map(
            (err) => ({

              field:
                err.path.join("."),

              message:
                err.message,
            })
          );

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Validation failed",

            errors,
          });
      }
    };
  };

export default
validate;