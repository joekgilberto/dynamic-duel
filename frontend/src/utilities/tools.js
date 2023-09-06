export function upperCase(string){
    let modifiedString = string.split('');
    modifiedString[0] = modifiedString[0].toUpperCase();
    modifiedString = modifiedString.join('')
    return modifiedString
}

export function searchString(string){
    let modifiedString = string.toLowerCase()
    modifiedString = modifiedString.split(' ')
    modifiedString = modifiedString.join("%20")
    return modifiedString
}

export function checkImage(url,cb) {
    let image = new Image();
    image.onload = function() {
      if (this.width > 0) {
        console.log("image exists");
        cb(url)
      }
    }
    image.onerror = function() {
      console.log("image doesn't exist");
    }

    image.src = url;
  }