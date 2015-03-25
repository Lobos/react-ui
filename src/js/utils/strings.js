var hashCode = function (str){
  var hash = 0
  var chr
  if (str.length === 0) return hash
  for (var i = 0, count=str.length; i < count; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}


module.exports = {
  hashCode: hashCode
}
