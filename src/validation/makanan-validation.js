import Joi from "joi";

const createMakananValidation = Joi.object({
  makanan: Joi.string().max(100).required(),
  minuman: Joi.string().max(100).required(),
  paket_murah: Joi.string().max(100).required(),
  aneka_salad: Joi.string().max(100).optional(),
  jumlah: Joi.string().max(100).optional(),
  harga: Joi.string().max(100).optional(),
});

const getMakananValidation = Joi.number().positive().required();

const updateMakananValidation = Joi.object({
  id: Joi.number().positive().required(),
  makanan: Joi.string().max(100).required(),
  minuman: Joi.string().max(100).required(),
  paket_murah: Joi.string().max(100).required(),
  aneka_salad: Joi.string().max(100).optional(),
  jumlah: Joi.string().max(100).optional(),
  harga: Joi.string().max(100).optional(),
});

const searchMakananValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  makanan: Joi.string().optional(),
  aneka_salad: Joi.string().optional(),
  jumlah: Joi.string().optional(),
});

export {
  createMakananValidation,
  getMakananValidation,
  updateMakananValidation,
  searchMakananValidation,
};
