function firstName(parent, args, context) {
  return context.prisma.link({ id: parent.id }).firstName()
}

function lastName(parent, args, context) {
  return context.prisma.link({ id: parent.id }).lastName()
}

function email(parent, args, context) {
  return context.prisma.link({ id: parent.id }).email()
}


module.exports = {
  firstName,
  lastName,
  email,

}