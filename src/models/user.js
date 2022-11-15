const prisma = require('../helpers/prisma');

exports.createNewUser = async (data) => {
  const user = await prisma.user.create({
    data: { ...data },
  });
  return user;
};

exports.getUserByEmailOrPhoneOrId = async (data) => {
  if (data.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    return user;
  } else if (data.phoneNumber) {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber: data.phoneNumber,
      },
    });
    return user;
  } else if (data.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    return user;
  }
};
