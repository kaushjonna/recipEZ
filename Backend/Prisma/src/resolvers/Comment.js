function text(parent, args, context) {
  return context.prisma.link({ id: parent.id }).text()
}

module.exports = {
  text
}