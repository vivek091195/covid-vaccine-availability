import moment from 'moment';
import cron from 'node-cron';
import axios from 'axios';

export async function availabilityCheck() {
  try {
    cron.schedule('* * * * *', async () => {
      await checkAvailability();
    });
  } catch (e) {
    console.log('an error occured: ' + JSON.stringify(e, null, 2));
    throw e;
  }
}

async function checkAvailability() {
  console.log('Called');
  let datesArray = await fetchNext10Days();
  datesArray.forEach((date) => {
    getSlotsForDate(date);
  });
}

function getSlotsForDate(DATE) {
  let config = {
    method: 'get',
    url:
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' +
      PINCODE +
      '&date=' +
      DATE,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
    },
  };

  axios(config)
    .then(function (slots) {
      let sessions = slots.data.sessions;
      let validSlots = sessions.filter(
        (slot) => slot.min_age_limit <= AGE && slot.available_capacity > 0
      );
      console.log({ date: DATE, validSlots: validSlots.length });
      if (validSlots.length > 0) {
        notifyMe(validSlots, DATE);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function fetchNext10Days() {
  let dates = [];
  let today = moment();
  for (let i = 0; i < 10; i++) {
    let dateString = today.format('DD-MM-YYYY');
    dates.push(dateString);
    today.add(1, 'day');
  }
  return dates;
}
