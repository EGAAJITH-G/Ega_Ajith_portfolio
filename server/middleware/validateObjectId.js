import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'INVALID_ID',
      message: 'The provided record identifier is malformed or invalid.'
    });
  }
  next();
};
