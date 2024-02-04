-- CreateTable
CREATE TABLE `makanans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `makanan` VARCHAR(100) NOT NULL,
    `minuman` VARCHAR(100) NOT NULL,
    `paket_murah` VARCHAR(100) NOT NULL,
    `aneka_salad` VARCHAR(100) NULL,
    `jumlah` VARCHAR(100) NULL,
    `harga` VARCHAR(100) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `makanans` ADD CONSTRAINT `makanans_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
