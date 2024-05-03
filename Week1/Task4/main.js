let answer = document.getElementById("answer");
function guessNumber() {
    let min = 1;
    let max = 100;
    let attempts = 0;
  
    while (true) {

      let guess = Math.floor((min + max) / 2);
      
      attempts++;
  
      let feedback = prompt(`Is your number ${guess}? Type 'higher', 'lower', or 'correct'`);
  
      if (feedback === 'correct') {
        return { guess, attempts, result: 'Success' };
      } else if (feedback === 'higher') {
        min = guess + 1;
      } else if (feedback === 'lower') {
        max = guess - 1;
      } else {
        alert("Please choose: 'higher', 'lower', or 'correct'.");
      }
    }
  }
  const { guess, attempts, result } = guessNumber();
  answer.innerHTML= `The program guessed ${guess} in ${attempts} attempts ${result}`;
  