function description(parent, args, context) {
  return context.prisma.link({ id: parent.id }).description()
}

module.exports = {
  description,
}