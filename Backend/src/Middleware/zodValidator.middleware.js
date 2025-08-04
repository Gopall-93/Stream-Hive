import { wrapperAsync } from "../utils/Error/wrapperAsync.js";

export const zodValidator = (schema) =>
  wrapperAsync(async (req, res, next) => {
    
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.flatten() });
    } else {
      req.validatedUser = result.data;
      next();
    }
  });
