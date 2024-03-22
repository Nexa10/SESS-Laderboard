// Create an array to store the imported images
const icons = [];

// Loop to dynamically import images
for (let i = 1; i <= 40; i++) {
    const icon = require(`../assets/images/${i}.png`);
    icons.push(icon);
}

// Export the icons array
export default icons;
