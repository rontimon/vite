// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }

export function setupCounter(element) {
  
  
  
  const setCounter = (count) => {
    console.log('I am here!')
  };

  element.addEventListener('click', () => setCounter());
  
  
}

