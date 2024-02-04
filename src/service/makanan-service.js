import { validate } from "../validation/validation.js";
import {
  createMakananValidation,
  getMakananValidation,
  searchMakananValidation,
  updateMakananValidation,
} from "../validation/makanan-validation.js";
import { prismaClient } from "../application/database.js";
//import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const makanan = validate(createMakananValidation, request);
  makanan.username = user.username;

  return prismaClient.makanan.create({
    data: makanan,
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      aneka_salad: true,
      jumlah: true,
      harga: true,
    },
  });
};

const get = async (user, makananId) => {
  makananId = validate(getMakananValidation, makananId);

  const makanan = await prismaClient.makanan.findFirst({
    where: {
      username: user.username,
      id: makananId,
    },
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      aneka_salad: true,
      jumlah: true,
      harga: true,
    },
  });

  if (!makanan) {
    throw new ResponseError(404, "makanan is not found");
  }

  return makanan;
};

const update = async (user, request) => {
  const makanan = validate(updateMakananValidation, request);

  const totalMakananInDatabase = await prismaClient.makanan.count({
    where: {
      username: user.username,
      id: makanan.id,
    },
  });

  if (totalMakananInDatabase !== 1) {
    throw new ResponseError(404, "makanan is not found");
  }

  return prismaClient.makanan.update({
    where: {
      id: makanan.id,
    },
    data: {
      makanan: makanan.makanan,
      minuman: makanan.minuman,
      paket_murah: makanan.paket_murah,
      aneka_salad: makanan.aneka_Salad,
      jumlah: makanan.jumlah,
      harga: makanan.harga,
    },
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      aneka_salad: true,
      jumlah: true,
      harga: true,
    },
  });
};

const remove = async (user, makananId) => {
  makananId = validate(getMakananValidation, makananId);

  const totalInDatabase = await prismaClient.makanan.count({
    where: {
      username: user.username,
      id: makananId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Makanan is not found");
  }

  return prismaClient.makanan.delete({
    where: {
      id: makananId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchMakananValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.makanan) {
    filters.push({
      makanan: {
        contains: request.makanan,
      },
    });
  }
  if (request.minuman) {
    filters.push({
      minuman: {
        contains: request.minuman,
      },
    });
  }
  if (request.paket_murah) {
    filters.push({
      paket_murah: {
        contains: request.paket_murah,
      },
    });
  }
  if (request.aneka_Salad) {
    filters.push({
      aneka_Salad: {
        contains: request.aneka_Salad,
      },
    });
  }
  if (request.jumlah) {
    filters.push({
      jumlah: {
        contains: request.jumlah,
      },
    });
  }
  if (request.harga) {
    filters.push({
      harga: {
        contains: request.harga,
      },
    });
  }

  const makanans = await prismaClient.makanan.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.makanan.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: makanans,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
