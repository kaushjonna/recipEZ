function userId(parent, args, context) {
  return context.prisma.link({ id: parent.id }).userId()
}
function recipeLink(parent, args, context) {
  return context.prisma.link({ id: parent.id }).recipeLink()
}

module.exports = {
  userId,
  recipeLink,
}