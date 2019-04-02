function name(parent, args, context) {
  return context.prisma.link({ id: parent.id }).name()
}

module.exports = {
  name,
}