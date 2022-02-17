import { CountUp } from "./countUp.min.js";

window.onload = function() {
  fetch('/api/stats').then(response => {
    response.json().then(jsonResponse => {
      const totalCaptachas = new CountUp('totalCaptchas', jsonResponse['totalCaptchas']);
      totalCaptachas.start();

      const totalViewed = new CountUp('totalViewed', jsonResponse['totalViewed']);
      totalViewed.start();

      const totalVerified = new CountUp('totalVerified', jsonResponse['totalVerified']);
      totalVerified.start();
    })
  })
}
