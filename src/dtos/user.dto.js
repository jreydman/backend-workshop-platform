module.exports = function UserDto(model) {
    this.id=model._id
    this.username=model.username
    this.email=model.email
    this.rules=model.rules
    this.groups=model.groups
    this.status=model.status
}