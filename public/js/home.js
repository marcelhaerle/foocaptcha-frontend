import { CountUp } from "./countUp.min.js";
import $ from "./jquery.module.js";

window.onload = function() {
  const loadStats = () => {
    $.get('/api/stats').then(response => {
      const totalCaptachas = new CountUp('totalCaptchas', response['totalCaptchas']);
      totalCaptachas.start();

      const totalViewed = new CountUp('totalViewed', response['totalViewed']);
      totalViewed.start();

      const totalVerified = new CountUp('totalVerified', response['totalVerified']);
      totalVerified.start();
    });
  };

  // Five minutes in millis.
  const FIVE_MINUTES = 5 * 60 * 1000;

  const charsGuess = $('#charsGuess');
  const imgChars = $('#imgChars');
  const reloadCharsButton = $('#reloadCharsButton');
  const verifyCharsButton = $('#verifyCharsButton');
  const charsVerifyResult = $('#charsVerifyResult');
  let charCaptchaTimerId = null;

  const equationGuess = $('#equationGuess');
  const imgEquation = $('#imgEquation');
  const reloadEquationButton = $('#reloadEquationButton');
  const verifyEquationButton = $('#verifyEquationButton');
  const equationVerifyResult = $('#equationVerifyResult');
  let equationCaptchaTimerId = null;

  const loadCharsCaptcha = () => {
    if (charCaptchaTimerId) {
      clearTimeout(charCaptchaTimerId);
    }
    $.get('/api/chars').then(response => {
      imgChars
        .attr('src', response.url)
        .attr('data-cid', response.id);
      verifyCharsButton.attr('disabled', null);
      charsGuess.val('');
      charsVerifyResult.text('');
      charCaptchaTimerId = setTimeout(() => {
        loadCharsCaptcha();
      }, FIVE_MINUTES);
    });
  };

  const loadEquationCaptcha = () => {
    if (equationCaptchaTimerId) {
      clearTimeout(equationCaptchaTimerId);
    }
    $.get('/api/equation').then(response => {
      imgEquation
        .attr('src', response.url)
        .attr('data-cid', response.id);
      verifyEquationButton.attr('disabled', null);
      equationGuess.val('');
      equationVerifyResult.text('');
      equationCaptchaTimerId = setTimeout(() => {
        loadEquationCaptcha();
      }, FIVE_MINUTES);
    });
  };

  // Empty guess input field.
  charsGuess.val('');
  equationGuess.val('');

  // Init loading captchas.
  loadCharsCaptcha();
  loadEquationCaptcha();

  reloadCharsButton.on('click', loadCharsCaptcha);

  verifyCharsButton.on('click', () => {
    const id = imgChars.attr('data-cid');
    const guess = charsGuess.val();
    $.get(`/api/verify/${id}/${guess}`)
      .then(() => {
        charsVerifyResult
          .text('Correct!')
          .removeClass('has-text-danger')
          .addClass('has-text-success');
        loadStats();
      })
      .catch(() => {
        charsVerifyResult
          .text('Failed!')
          .removeClass('has-text-success')
          .addClass('has-text-danger');
        loadStats();
      });
    verifyCharsButton.attr('disabled', 'true');
  });

  reloadEquationButton.on('click', loadEquationCaptcha);

  verifyEquationButton.on('click', () => {
    const id = imgEquation.attr('data-cid');
    const guess = equationGuess.val();
    $.get(`/api/verify/${id}/${guess}`)
      .then(() => {
        equationVerifyResult
          .text('Correct!')
          .removeClass('has-text-danger')
          .addClass('has-text-success');
        loadStats();
      })
      .catch(() => {
        equationVerifyResult
          .text('Failed!')
          .removeClass('has-text-success')
          .addClass('has-text-danger');
        loadStats();
      });
    verifyEquationButton.attr('disabled', 'true');
  });
}
