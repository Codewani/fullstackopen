const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    total = 0
    for (let i = 0; i < blogs.length; i++) {
        total = total + blogs[i].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    max = 0
    let favorite = NaN
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
          favorite = blogs[i]
          max = blogs[i].likes
        }
    }

    return favorite
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}