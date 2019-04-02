function name(parent, args, context) {
  return context.prisma.link({ id: parent.id }).name()
}
function description(parent, args, context) {
  return context.prisma.link({ id: parent.id }).description()
}


module.exports = {
  name,
  description,
}