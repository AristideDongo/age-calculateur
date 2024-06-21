const current_date = new Date();
let userinput = {
  date: '',
  month: '',
  year: ''
};
let user_date;
let user_month;
let user_year;
let final_day = ''; // Initialisez avec une valeur par défaut
let final_month = ''; // Initialisez avec une valeur par défaut
let final_year = ''; // Initialisez avec une valeur par défaut
let m = 0;
let y = 0;

// Écouteur pour la saisie de la date
userinput.date = document.querySelector('.input.date');
userinput.date.addEventListener('input', function () {
  user_date = Number(this.value);

  if (this.value.length >= parseInt(this.getAttribute('maxlength'))) {
    if (user_date <= 0 || user_date > 31 || isNaN(user_date)) {
      document.querySelector('.Errorlabeldate').innerHTML = `Must be a valid Date`;
      return; // Arrêtez le traitement si la date n'est pas valide
    } else {
      document.querySelector('.Errorlabeldate').innerHTML = ``;
      // Calculer le jour final
      if (current_date.getDate() > user_date) {
        final_day = current_date.getDate() - user_date;
        m = 0;
      } else {
        final_day = current_date.getDate() - user_date + 30;
        m = 1;
      }
    }
  }

  // Affichage du résultat
  const dateResult = document.querySelector('.days_result');
  dateResult.innerHTML = final_day !== '' ? final_day : ''; // Assurez-vous que final_day n'est pas vide
});

// Écouteur pour la saisie du mois
userinput.month = document.querySelector('.input.month');
userinput.month.addEventListener('input', function () {
  user_month = Number(this.value);
  if (this.value.length >= parseInt(this.getAttribute('maxlength'))) {
    if (user_month <= 0 || user_month > 12 || isNaN(user_month)) {
      document.querySelector('.Errorlabelmonth').innerHTML = `Must be a valid Month`;
      return; // Arrêtez le traitement si le mois n'est pas valide
    } else {
      document.querySelector('.Errorlabelmonth').innerHTML = ``;
      // Calculer le mois final
      if (current_date.getMonth() >= user_month && m === 0) {
        final_month = current_date.getMonth() + 1 - user_month;
        y = 0;
      } else if (current_date.getMonth() > user_month && m !== 0) {
        final_month = current_date.getMonth() + 1 - user_month - 1;
        y = 0;
      } else if (current_date.getMonth() === user_month && m !== 0) {
        final_month = current_date.getMonth() + 1 - user_month - 1 + 12;
        y = 1;
      } else if (current_date.getMonth() < user_month && m === 0) {
        final_month = current_date.getMonth() + 1 - user_month + 12;
        y = 1;
      } else if (current_date.getMonth() < user_month && m !== 0) {
        final_month = current_date.getMonth() + 1 - user_month + 12 - 1;
        y = 1;
      }
    }

    if (final_month === 12) {
      final_month = 0;
    }

    // Affichage du résultat
    const monthResult = document.querySelector('.month_result');
    monthResult.innerHTML = final_month !== '' ? final_month : ''; // Assurez-vous que final_month n'est pas vide
  }
});

// Écouteur pour la saisie de l'année
userinput.year = document.querySelector('.input.year');
userinput.year.addEventListener('input', function () {
  user_year = Number(this.value);
  if (this.value.length >= parseInt(this.getAttribute('maxlength'))) {
    if (user_year > current_date.getFullYear() || user_year <= 0 || isNaN(user_year)) {
      document.querySelector('.Errorlabelyear').innerHTML = `Must be in the past`;
      return; // Arrêtez le traitement si l'année n'est pas valide
    } else {
      document.querySelector('.Errorlabelyear').innerHTML = ``;
      // Calculer l'année finale
      if (y !== 0 && final_month === 0) {
        final_year = current_date.getFullYear() - 1 - user_year + 1;
      } else if (final_month === 0 && y === 0) {
        final_year = current_date.getFullYear() - user_year + 1;
      } else if (y !== 0) {
        final_year = current_date.getFullYear() - 1 - user_year;
      } else if (y === 0) {
        final_year = current_date.getFullYear() - user_year;
      }
    }

    // Affichage du résultat
    const yearResult = document.querySelector('.year_result');
    yearResult.innerHTML = final_year !== '' ? final_year : ''; // Assurez-vous que final_year n'est pas vide
  }
});
